import { NextRequest, NextResponse } from "next/server";
import { getBackendApiUrl } from "@/app/api/auth/cookies";

interface ProxyRouteContext {
  readonly params: Promise<{
    readonly path: string[];
  }>;
}

const hopByHopHeaders = new Set([
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

const buildBackendUrl = async (request: NextRequest, context: ProxyRouteContext) => {
  const { path } = await context.params;
  const url = new URL(request.url);
  const backendUrl = new URL(`${getBackendApiUrl().replace(/\/$/, "")}/${path.map(encodeURIComponent).join("/")}`);
  backendUrl.search = url.search;
  return backendUrl;
};

const buildHeaders = (request: NextRequest) => {
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!hopByHopHeaders.has(key.toLowerCase())) headers.set(key, value);
  });
  return headers;
};

const proxyRequest = async (request: NextRequest, context: ProxyRouteContext) => {
  const backendUrl = await buildBackendUrl(request, context);
  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const response = await fetch(backendUrl, {
    method: request.method,
    headers: buildHeaders(request),
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.set("Cache-Control", "no-store, max-age=0");

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
};

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
