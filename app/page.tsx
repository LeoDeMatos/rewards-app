"use client";

import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import MainApp from "@/components/MainApp";

export default function Home() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  return <MainApp />;
}
