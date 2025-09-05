import React from "react";
import useIsMobile from "./useIsMobile";
import StepperDesktop from "../Organisation/Stapper";
import ProgressMobile from "./ProgressMobile";

interface StepperWrapperProps {
  currentStep: number;
  steps: Array<{ label: string; icon?: React.ReactNode }>;
}

export default function StepperWrapper({ currentStep, steps }: StepperWrapperProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <ProgressMobile currentStep={currentStep} steps={steps} />
  ) : (
    <StepperDesktop currentStep={currentStep} steps={steps} />
  );
}
