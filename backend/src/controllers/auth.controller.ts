import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as authService from "../services/auth.service";

/**
 * POST /api/auth/register
 * Register a new nurse account (public registration).
 */
export const register = async (req: AuthRequest, res: Response) => {
  try {
    const newUser = await authService.registerUser(req.body);

    res.status(201).json({
      status: "success",
      data: {
        user_id: newUser.id,
        fullName: newUser.fullName,
        role: newUser.role,
        created_at: newUser.createdAt,
      },
      message: "Pendaftaran berhasil",
    });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string; code?: string };
    const status = err.status || 500;
    const isInternalError = status === 500;
    
    console.error("Register Error:", error);
    
    res.status(status).json({
      status: "error",
      message: isInternalError ? "Terjadi kesalahan pada server" : (err.message || "Terjadi kesalahan"),
      ...(err.code && { error_code: err.code }),
    });
  }
};

/**
 * POST /api/auth/login
 * Login with email/phone + password. Returns access + refresh tokens.
 */
export const login = async (req: AuthRequest, res: Response) => {
  try {
    const data = await authService.loginUser(req.body);

    res.status(200).json({ status: "success", data });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string; code?: string };
    const status = err.status || 500;
    const isInternalError = status === 500;
    
    console.error("Login Error:", error);
    
    res.status(status).json({
      status: "error",
      message: isInternalError ? "Terjadi kesalahan pada server" : (err.message || "Terjadi kesalahan"),
      ...(err.code && { error_code: err.code }),
    });
  }
};

/**
 * POST /api/auth/refresh
 * Refresh access token using a valid refresh token.
 */
export const refresh = async (req: AuthRequest, res: Response) => {
  try {
    const data = await authService.refreshAccessToken(req.body.refresh_token);

    res.status(200).json({ status: "success", data });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string; code?: string };
    const status = err.status || 500;
    const isInternalError = status === 500;
    
    console.error("Refresh Error:", error);
    
    res.status(status).json({
      status: "error",
      message: isInternalError ? "Terjadi kesalahan pada server" : (err.message || "Terjadi kesalahan"),
      ...(err.code && { error_code: err.code }),
    });
  }
};

/**
 * POST /api/auth/logout
 * Invalidate refresh token.
 */
export const logout = async (req: AuthRequest, res: Response) => {
  try {
    await authService.invalidateRefreshToken(req.body.refresh_token);

    res.status(200).json({
      status: "success",
      message: "Berhasil keluar dari akun",
    });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    const status = err.status || 500;
    console.error("Logout Error:", error);
    res.status(status).json({
      status: "error",
      message: err.message || "Terjadi kesalahan pada server",
    });
  }
};

/**
 * GET /api/auth/me
 * Get current user profile. Requires authentication.
 */
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await authService.getUserProfile(req.user!.id);

    res.status(200).json({ status: "success", data: profile });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    const status = err.status || 500;
    const isInternalError = status === 500;
    
    console.error("GetMe Error:", error);
    
    res.status(status).json({
      status: "error",
      message: isInternalError ? "Terjadi kesalahan pada server" : (err.message || "Terjadi kesalahan"),
    });
  }
};

