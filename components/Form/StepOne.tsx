"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { JSX } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import NextPrev from "./NextPrev";

export default function StepOne<T extends FieldValues>({
  form,
  fullName,
  email,
  phone,
  dateOfBirth,
  profilePic,
}: {
  form: UseFormReturn<T>;
  fullName: Path<T>;
  email: Path<T>;
  phone: Path<T>;
  dateOfBirth: Path<T>;
  profilePic: Path<T>;
}): JSX.Element {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* fullName start  */}
        <FormField
          control={form.control}
          name={fullName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* fullName end  */}
        {/* email start  */}
        <FormField
          control={form.control}
          name={email}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* email end  */}
        {/* Phone start  */}
        <FormField
          control={form.control}
          name={phone}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormDescription>e.g. +1-123-456-7890</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone end  */}
        {/* DOB start  */}
        <FormField
          control={form.control}
          name={dateOfBirth}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                You must be at least 18 years old
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* DOB end  */}
        {/* Picture start  */}
        <FormField
          control={form.control}
          name={profilePic}
          render={({ field }) => {
            const { onChange, ...restField } = field;
            return (
              <FormItem>
                <FormLabel>Profile picture</FormLabel>
                <FormControl>
                  <Input
                    id={profilePic}
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormDescription>
                  Please upload a picture of yours.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {/* Picture end  */}
      </div>
      <NextPrev />
    </>
  );
}
