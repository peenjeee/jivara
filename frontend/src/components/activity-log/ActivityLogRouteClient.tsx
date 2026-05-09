"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import DashboardRouteFallback from "@/components/dashboard/DashboardRouteFallback";
import { getDashboardRole, isOperationalAdminRole } from "@/components/dashboard/navigation";
import { useAuthStore } from "@/store/auth";

const ActivityLogPage = dynamic(() => import("./ActivityLogPage"), { ssr: false, loading: () => <DashboardRouteFallback /> });
const PatientActivityLogPage = dynamic(() => import("./PatientActivityLogPage"), { ssr: false, loading: () => <DashboardRouteFallback /> });

interface ActivityLogRouteClientProps {
  readonly initialPatientName?: string;
  readonly initialCategory?: string;
}

export default function ActivityLogRouteClient({ initialPatientName, initialCategory }: ActivityLogRouteClientProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasAuthHydrated = useAuthStore((state) => state.hasHydrated);
  const dashboardRole = getDashboardRole(user?.role);

  useEffect(() => {
    if (!hasAuthHydrated || dashboardRole !== "super_admin") return;
    router.replace("/dashboard");
  }, [dashboardRole, hasAuthHydrated, router]);

  if (!hasAuthHydrated) return null;
  if (dashboardRole === "super_admin") return <DashboardRouteFallback />;

  return dashboardRole === "nurse" || isOperationalAdminRole(dashboardRole) ? (
    <ActivityLogPage initialPatientName={initialPatientName} initialCategory={initialCategory} readOnly={isOperationalAdminRole(dashboardRole)} />
  ) : (
    <PatientActivityLogPage initialCategory={initialCategory} />
  );
}
