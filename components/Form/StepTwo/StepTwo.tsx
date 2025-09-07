"use client";
import { Data } from "@/components/Form/MultiStepForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { mockManagers } from "@/mock-data/mockManagers";
import { skillsByDepartment } from "@/mock-data/skills";
import { stepTwoSchema } from "@/schemas/stepTwo";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";
import { JSX, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const departmentList = Object.keys(skillsByDepartment);

export default function StepTwo({
  setData,
  setStep,
  data,
}: {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  data: z.infer<typeof stepTwoSchema>;
}): JSX.Element {
  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      position: "",
      startDate: new Date(),
      salaryExpt: 0,
    },
  });
  const { setValue } = form;
  useEffect(() => {
    if (data) {
      setValue("department", data.department);
      setValue("jobType", data.jobType);
      setValue("manager", data.manager);
      setValue("position", data.position);
      setValue("salaryExpt", data.salaryExpt);
      setValue("startDate", data.startDate);
    }
  }, [data, setValue]);

  function onSubmit(values: z.infer<typeof stepTwoSchema>) {
    setData((prev) => ({
      ...prev,
      stepTwo: {
        ...prev.stepTwo,
        ...values,
      },
    }));
    setStep(3);
  }
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prev) => (prev > 1 && prev <= 5 ? --prev : prev));
  };
  const selectedDept = form.watch("department");

  const managersList = mockManagers
    .filter((managerName) => managerName.department === selectedDept)
    .map((item) => item.name);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-full mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* department start  */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departmentList.map((department, i) => (
                        <SelectItem key={i} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* department end  */}
            {/* position start  */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Position Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* position end  */}
            {/* start date start  */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When you can start ?</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* start date end  */}
            {/* Job Type start  */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Job Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="full-time"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Full-time
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="part-time"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Part-time
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem
                            value="contract"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Contract
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Job Type end  */}
            {/* Managers start */}
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Manager</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? managersList.find(
                                  (managerName) => managerName === field.value
                                )
                              : "Select Manager"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search manager..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No Manager found.</CommandEmpty>
                            <CommandGroup>
                              {managersList.map((managerName, i) => (
                                <CommandItem
                                  value={managerName}
                                  key={i}
                                  onSelect={() => {
                                    form.setValue("manager", managerName);
                                  }}
                                >
                                  {managerName}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      managerName === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select your Department first
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Managers end */}
            {/* Salary Expectation start  */}
            <FormField
              control={form.control}
              name="salaryExpt"
              render={({ field }) => {
                const expected = form.watch("salaryExpt");
                const type = form.watch("jobType");

                return (
                  <FormItem>
                    <FormLabel>Salary Expectation</FormLabel>
                    {type == "full-time" ? (
                      <FormDescription>
                        Full-time: annual salary ${expected}
                      </FormDescription>
                    ) : type == "part-time" ? (
                      <FormDescription>
                        Part-time: annual salary ${expected}
                      </FormDescription>
                    ) : type == "contract" ? (
                      <FormDescription>
                        Contract: hourly rate ${expected}
                      </FormDescription>
                    ) : null}

                    <FormControl>
                      {type == "full-time" ? (
                        <Slider
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                          min={30000}
                          max={200000}
                          step={10000}
                          className="cursor-pointer"
                        />
                      ) : type == "part-time" ? (
                        <Slider
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                          min={5000}
                          max={30000}
                          step={1000}
                          className="cursor-pointer"
                        />
                      ) : type == "contract" ? (
                        <Slider
                          defaultValue={[field.value]}
                          onValueChange={(vals) => {
                            field.onChange(vals[0]);
                          }}
                          min={50}
                          max={150}
                          step={10}
                          className="cursor-pointer"
                        />
                      ) : null}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Salary Expectation end  */}
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
