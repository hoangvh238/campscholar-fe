"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

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

import { useCreateOrUpdateClassroomMutation } from "@/store/queries/classroom";

const CreateClassroomSchema = z.object({
  name: z.string().min(3, "Classroom name must be at least 3 characters"),
});

export default function CreateClassroomPage() {
  const router = useRouter();
  const [createClassroom, { isLoading }] = useCreateOrUpdateClassroomMutation();

  const form = useForm<z.infer<typeof CreateClassroomSchema>>({
    resolver: zodResolver(CreateClassroomSchema),
    defaultValues: {
      name: "",
    },
  });

  const submitForm = async (data: z.infer<typeof CreateClassroomSchema>) => {
    try {
      console.log("Submitting data:", data);
      const response = await createClassroom(data).unwrap();
      toast.success("Classroom created successfully!");
      const id = response.result;
      router.replace(`/administration/classrooms/manage/${id}`);
    } catch (error) {
      console.error("Error creating classroom:", error);
      toast.error("Failed to create classroom. Try again!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="grid gap-6 p-2 md:grid-cols-2"
      >
        {/* Classroom Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <Label>
                Classroom Name <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="mt-6 md:col-span-2">
          <Button type="submit" className="w-full"  disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Classroom"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
