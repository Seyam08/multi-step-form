"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { multiStepFormSchema } from "@/schemas/multiStepFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StepOne from "./StepOne";

export default function MultiStepForm(): JSX.Element {
  // 1. Define your form.
  const form = useForm<z.infer<typeof multiStepFormSchema>>({
    resolver: zodResolver(multiStepFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof multiStepFormSchema>) {
    console.log(values);
  }

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-full mx-auto"
          >
            <StepOne
              form={form}
              fullName="fullName"
              email="email"
              phone="phone"
              dateOfBirth="dateOfBirth"
              profilePic="profilePic"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
