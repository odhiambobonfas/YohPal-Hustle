import ConfirmResetPassword from "@/components/custom/app/auth/ConfirmResetPassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-page">
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmResetPassword />
      </Suspense>
    </div>
  );
}
