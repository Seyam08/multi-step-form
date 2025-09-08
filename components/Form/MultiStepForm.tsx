"use client";

import StepFour from "@/components/Form/StepFour/StepFour";
import StepOne from "@/components/Form/StepOne/StepOne";
import StepThree from "@/components/Form/StepThree/StepThree";
import StepTwo from "@/components/Form/StepTwo/StepTwo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { stepFourSchema } from "@/schemas/stepFour";
import { stepOneSchema } from "@/schemas/stepOne";
import { stepThreeSchema } from "@/schemas/stepThree";
import { stepTwoSchema } from "@/schemas/stepTwo";
import { ChevronLeftIcon } from "lucide-react";
import { JSX, useState } from "react";
import z from "zod";
import StepFive from "./StepFive/StepFive";

export type Data = {
  stepOne: z.infer<typeof stepOneSchema>;
  stepTwo: z.infer<typeof stepTwoSchema>;
  stepThree: z.infer<typeof stepThreeSchema>;
  stepFour: z.infer<typeof stepFourSchema>;
};
export const initialData: Data = {
  stepOne: {} as z.infer<typeof stepOneSchema>,
  stepTwo: {} as z.infer<typeof stepTwoSchema>,
  stepThree: {} as z.infer<typeof stepThreeSchema>,
  stepFour: {} as z.infer<typeof stepFourSchema>,
};
export default function MultiStepForm(): JSX.Element {
  const [data, setData] = useState<Data>(initialData);
  const [step, setStep] = useState<number>(0);

  const handlePrev = () => {
    setStep((prev) => (prev > 1 && prev <= 5 ? --prev : prev));
  };
  return (
    <Card className="w-full md:max-w-3xl 2xl:max-w-5xl">
      <CardContent>
        <Progress value={step * 20} />
      </CardContent>
      <CardHeader>
        {step === 0 ? (
          <CardTitle>First step - Personal Info</CardTitle>
        ) : step === 1 ? (
          <CardTitle>Second step - Job Details</CardTitle>
        ) : step === 2 ? (
          <CardTitle>Third step - Skills & Preferences</CardTitle>
        ) : step === 3 ? (
          <CardTitle>Fourth step - Emergency Contact</CardTitle>
        ) : step === 4 ? (
          <CardTitle>Last step - Review & Submit</CardTitle>
        ) : step === 5 ? (
          <CardTitle>Thank you for submitting the form.</CardTitle>
        ) : (
          <CardTitle>There is something wrong!!!</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {step === 0 ? (
          <StepOne data={data.stepOne} setData={setData} setStep={setStep} />
        ) : step === 1 ? (
          <StepTwo data={data.stepTwo} setData={setData} setStep={setStep} />
        ) : step === 2 ? (
          <StepThree
            department={data.stepTwo.department}
            data={data.stepThree}
            setData={setData}
            setStep={setStep}
          />
        ) : step === 3 ? (
          <StepFour
            dob={data.stepOne.dateOfBirth}
            data={data.stepFour}
            setData={setData}
            setStep={setStep}
          />
        ) : step === 4 ? (
          <StepFive data={data} setData={setData} setStep={setStep} />
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="uppercase"
            onClick={handlePrev}
          >
            <ChevronLeftIcon /> prev
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
      </CardFooter>
    </Card>
  );
}
