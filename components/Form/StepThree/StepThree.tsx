"use client";
import { Data } from "@/components/Form/MultiStepForm";
import TimeRange from "@/components/TimeRange/TimeRange";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { skillsByDepartment } from "@/mock-data/skills";
import { stepThreeSchema } from "@/schemas/stepThree";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export type TimeRange = {
  start: string;
  end: string;
};
type Department = keyof typeof skillsByDepartment;

const getSkillsByDepartment = (department: Department): string[] => {
  return skillsByDepartment[department] ?? [];
};

export default function StepThree({
  setData,
  setStep,
  data,
  department,
}: {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: z.infer<typeof stepThreeSchema>;
  department: string;
}): JSX.Element {
  const [timeRange, setTimeRange] = useState<TimeRange>({ start: "", end: "" });
  const [remoteApprove, setRemoteApprove] = useState<boolean>(false);
  const form = useForm<z.infer<typeof stepThreeSchema>>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      skills: [],
      remotePrefer: 50,
      managerApprove: false,
    },
  });
  const { setValue } = form;
  const selectedSkills = form.watch("skills");
  const rmPrefer = form.watch("remotePrefer");

  useEffect(() => {
    if (data) {
      setValue("experience", data.experience);
      setValue("managerApprove", data.managerApprove);
      setValue("notes", data.notes);
      setValue("preferWorkTime", data.preferWorkTime);
      setValue("remotePrefer", data.remotePrefer);
      // setValue("skills", data.skills);
    }
  }, [data, setValue]);

  useEffect(() => {
    setValue("preferWorkTime", {
      start: timeRange.start,
      end: timeRange.end,
    });
  }, [timeRange, setValue]);

  useEffect(() => {
    if (rmPrefer < 50) {
      setRemoteApprove(true);
    } else {
      setRemoteApprove(false);
    }
  }, [rmPrefer]);

  function onSubmit(values: z.infer<typeof stepThreeSchema>) {
    setData((prev) => ({
      ...prev,
      stepThree: {
        ...prev.stepThree,
        ...values,
      },
    }));
    setStep(3);
  }
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prev) => (prev > 1 && prev <= 5 ? --prev : prev));
  };

  const skillSet = getSkillsByDepartment(
    (department in skillsByDepartment
      ? department
      : "Engineering") as Department
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Primary Skills start  */}
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormDescription>
                      Choose your primary skills ( at least 3 )
                    </FormDescription>
                  </div>
                  {skillSet.map((item, i) => (
                    <FormField
                      key={i}
                      control={form.control}
                      name="skills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={i}
                            className="flex flex-row items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                className="cursor-pointer"
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Primary Skills end  */}
            {/* Experience for Each Skill start */}
            <div className="space-y-3">
              {selectedSkills?.map((item, i) => {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={`experience.${i}`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>{item}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Related Experience"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
            </div>
            {/* Experience for Each Skill end */}
            {/* Preferred Working Hours start  */}
            <TimeRange setTimeRange={setTimeRange} />
            {/* Preferred Working Hours end  */}
            {/* Remote Work Preference start */}
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="remotePrefer"
                render={({ field }) => {
                  const prefer = form.watch("remotePrefer");
                  return (
                    <FormItem>
                      <FormLabel>Remote Preference</FormLabel>
                      <FormDescription>
                        Your preference: {prefer}%
                      </FormDescription>

                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                          min={0}
                          max={100}
                          step={5}
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {remoteApprove ? (
                <FormField
                  control={form.control}
                  name="managerApprove"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Manager&apos;s Approval</FormLabel>
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
              ) : null}
            </div>
            {/* Remote Work Preference end */}
            {/* Extra Notes start  */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    If you want to tell anything, just go on....
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Extra Notes start  */}
          </div>

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
