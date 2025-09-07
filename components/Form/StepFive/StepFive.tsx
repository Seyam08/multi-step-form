"use client";
import { Data } from "@/components/Form/MultiStepForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { stepFiveSchema } from "@/schemas/stepFive";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function StepFive({
  setData,
  setStep,
  data,
}: {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: Data;
}): JSX.Element {
  const form = useForm<z.infer<typeof stepFiveSchema>>({
    resolver: zodResolver(stepFiveSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof stepFiveSchema>) {
    setStep(5);
  }
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prev) => (prev > 1 && prev <= 5 ? --prev : prev));
  };
  const { stepOne, stepTwo, stepThree, stepFour } = data;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full mx-auto"
        >
          <div className="max-w-3xl mx-auto space-y-6 mb-6">
            {/* Step One */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Full Name:</strong> {stepOne.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {stepOne.email}
                </p>
                <p>
                  <strong>Phone:</strong> {stepOne.phone}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(stepOne.dateOfBirth).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Step Two */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Department:</strong> {stepTwo.department}
                </p>
                <p>
                  <strong>Position:</strong> {stepTwo.position}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(stepTwo.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Job Type:</strong> {stepTwo.jobType}
                </p>
                <p>
                  <strong>Salary Expectation:</strong> ${stepTwo.salaryExpt}
                </p>
                <p>
                  <strong>Manager:</strong> {stepTwo.manager}
                </p>
              </CardContent>
            </Card>

            {/* Step Three */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Skills:</strong> {stepThree.skills.join(", ")}
                </p>
                <p>
                  <strong>Experience:</strong> {stepThree.experience.join(", ")}
                </p>
                <p>
                  <strong>Preferred Work Time:</strong>{" "}
                  {stepThree.preferWorkTime.start} -{" "}
                  {stepThree.preferWorkTime.end}
                </p>
                <p>
                  <strong>Remote Preference:</strong> {stepThree.remotePrefer}%
                </p>
                <p>
                  <strong>Manager Approval:</strong>{" "}
                  {stepThree.managerApprove ? "Yes" : "No"}
                </p>
              </CardContent>
            </Card>

            {/* Step Four */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Contact Name:</strong> {stepFour.contactName}
                </p>
                <p>
                  <strong>Relationship:</strong> {stepFour.relationship}
                </p>
                <p>
                  <strong>Phone:</strong> {stepFour.phone}
                </p>
                <Separator />
                <p>
                  <strong>Guardian Name:</strong> {stepFour.guardianName}
                </p>
                <p>
                  <strong>Guardian Phone:</strong> {stepFour.guardianPhone}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Confirm button  */}
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Confirm before submitting</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* next and prev button  start*/}
          <div className="flex justify-between my-5">
            <Button
              variant="outline"
              size="sm"
              className="uppercase"
              onClick={handlePrev}
            >
              <ChevronLeftIcon /> prev
            </Button>
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="uppercase"
            >
              <ChevronRightIcon /> next
            </Button>
          </div>
          {/* next and prev button  end*/}
        </form>
      </Form>
    </>
  );
}
