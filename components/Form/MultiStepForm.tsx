"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { JSX } from "react";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";

export default function MultiStepForm(): JSX.Element {
  return (
    <Card className="w-full md:max-w-3xl 2xl:max-w-5xl">
      <CardContent>
        <Progress value={40} />
      </CardContent>
      <CardHeader>
        <CardTitle>First step - Personal Info</CardTitle>
        <CardDescription>
          These personal information is required for the process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepOne />

        <StepTwo />
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
