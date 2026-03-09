"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import HustlerWelcome from "@/components/custom/app/shared/HustlerWelcome";
import HustlerConfirm from "@/components/custom/app/shared/HustlerConfirm";

type Step = "welcome" | "confirm";

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [step, setStep] = useState<Step>("welcome");

  const handleFinishSetup = (data: { email: string; phone: string }) => {
    // TODO: persist email/phone to Firestore profile
    console.log("Setup complete", data);
    router.push("/profile");
  };

  if (step === "welcome") {
    return <HustlerWelcome onCompleteVerification={() => setStep("confirm")} />;
  }

  return (
    <HustlerConfirm
      defaultEmail={user?.email ?? ""}
      onFinishSetup={handleFinishSetup}
      onMaybeLater={() => router.push("/profile")}
    />
  );
}
