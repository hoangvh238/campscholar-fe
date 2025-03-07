"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/common/form";
import { Input } from "@/components/core/common/input";
import { Button } from "@/components/core/common/button";
import {
  useGetClassroomByIdQuery,
  useCreateOrUpdateClassroomMutation,
} from "@/store/queries/classroom";

const classroomFormSchema = z.object({
  name: z.string().min(1, "Classroom name is required"),
});

type ClassroomFormValues = z.infer<typeof classroomFormSchema>;

export default function UpdateClassroomForm({
  classroomId,
}: {
  classroomId: string;
}) {
  const { data, isLoading, error } = useGetClassroomByIdQuery(classroomId);
  const [updateClassroom] = useCreateOrUpdateClassroomMutation();

  const form = useForm<ClassroomFormValues>({
    resolver: zodResolver(classroomFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.result.name,
      });
    }
  }, [data, form]);

  if (isLoading) return <p>Loading classroom details...</p>;
  if (error) return <p>Error loading classroom: {JSON.stringify(error)}</p>;

  const handleUpdateClassroom = async (data: ClassroomFormValues) => {
    try {
      await updateClassroom({ id: classroomId, name: data.name }).unwrap();
      toast.success("Classroom updated successfully!");
    } catch (error) {
      toast.error("Failed to update classroom.");
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleUpdateClassroom)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Classroom Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Classroom</Button>
      </form>
    </Form>
  );
}
