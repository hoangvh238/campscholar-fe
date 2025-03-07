"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import { Button } from "@/components/core/common/button";
import { Input } from "@/components/core/common/input";
import { Label } from "@/components/core/common/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/core/common/form";
import { CreateContestSchema } from "@/utils/zod";
import { useCreateOrUpdateContestMutation } from "@/store/queries/contest";

export default function CreateContestPage() {
  const router = useRouter();
  const [createContest, { isLoading }] = useCreateOrUpdateContestMutation();

  const form = useForm<z.infer<typeof CreateContestSchema>>({
    resolver: zodResolver(CreateContestSchema),
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      registrationDeadline: "",
      participantType: 1,
      teamSize: 2, // Mặc định 2 nếu là Team
    },
  });

  const submitForm = async (data: z.infer<typeof CreateContestSchema>) => {
    const convertToUTC = (dateString: string) => {
      if (!dateString) return null;
      return new Date(dateString).toISOString(); // Chuyển sang UTC ISO 8601
    };

    const requestData = {
      ...data,
      startTime: convertToUTC(data.startTime),
      endTime: convertToUTC(data.endTime),
      registrationDeadline: convertToUTC(data.registrationDeadline),
    };

    try {
      console.log("Submitting data:", requestData);
      await createContest(requestData).unwrap();
      toast.success("Contest created successfully!");
      router.push("/administration/contests");
    } catch (error) {
      console.error("Error creating contest:", error);
      toast.error("Failed to create contest. Try again!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="grid min-h-full gap-6 p-2 md:grid-cols-2"
      >
        {/* Contest Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>
                Contest Name <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Time */}
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <Label>
                Start Time <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Registration Deadline */}
        <FormField
          control={form.control}
          name="registrationDeadline"
          render={({ field }) => (
            <FormItem>
              <Label>
                Registration Deadline <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Time */}
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <Label>
                End Time <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Participant Type */}
        <FormField
          control={form.control}
          name="participantType"
          render={({ field }) => (
            <FormItem>
              <Label>
                Participant Type <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Select
                  value={String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select participant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Individual</SelectItem>{" "}
                    {/* Giá trị 1 */}
                    <SelectItem value="0">Team</SelectItem> {/* Giá trị 0 */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Team Size (Chỉ hiển thị nếu chọn Team) */}
        {form.watch("participantType") === 0 && (
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Team Size <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input type="number" {...field} min={2} max={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Submit Button */}
        <div className="mt-6 flex md:col-span-2">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Contest"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
