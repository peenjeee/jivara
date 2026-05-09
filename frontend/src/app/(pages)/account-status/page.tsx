import type { Metadata } from "next";
import { AuthPageShell } from "@/components/auth";
import AccountStatusPage from "@/components/auth/AccountStatusPage";

export const metadata: Metadata = {
  title: "Status Akun",
  description: "Lihat status persetujuan akun admin Jivara.",
  robots: { index: false, follow: false },
};

export default function AccountStatusRoute() {
  return (
    <AuthPageShell>
      <AccountStatusPage />
    </AuthPageShell>
  );
}
