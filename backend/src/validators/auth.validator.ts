import { Request, Response, NextFunction } from "express";

interface ValidationRule {
  field: string;
  label: string;
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
}

const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const rule of rules) {
      const value = req.body[rule.field];

      // Required check
      if (rule.required && (!value || (typeof value === "string" && !value.trim()))) {
        return res.status(400).json({
          status: "error",
          message: `${rule.label} wajib diisi`,
          error_code: "VALIDATION_ERROR",
        });
      }

      // Skip optional empty fields
      if (!value) continue;

      // Min length check
      if (rule.minLength && typeof value === "string" && value.length < rule.minLength) {
        return res.status(400).json({
          status: "error",
          message: `${rule.label} minimal harus ${rule.minLength} karakter`,
          error_code: "VALIDATION_ERROR",
        });
      }

      // Pattern check
      if (rule.pattern && typeof value === "string" && !rule.pattern.test(value)) {
        return res.status(400).json({
          status: "error",
          message: rule.patternMessage || `Format ${rule.label} tidak valid`,
          error_code: "VALIDATION_ERROR",
        });
      }
    }
    next();
  };
};

// ─── Pre-built Validators ────────────────────

export const validateRegister = validate([
  { field: "fullName", label: "Nama lengkap", required: true },
  {
    field: "email",
    label: "Email",
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: "Format email tidak valid",
  },
  { field: "password", label: "Kata sandi", required: true, minLength: 8 },
]);

export const validateLogin = validate([
  { field: "password", label: "Kata sandi", required: true },
]);

export const validateRefreshToken = validate([
  { field: "refresh_token", label: "Token refresh", required: true },
]);
