import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Checkbox } from "@/components/core/common/checkbox";
import { Textarea } from "@/components/core/common/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/common/form";
import { Button } from "@/components/core/common/button";
import { useCreateorupdateTestcaseMutation } from "@/store/queries/testcase";
const testCaseFormSchema = z.object({
  inputData: z.string().min(1, {
    message: "Input is required.",
  }),
  expectedOutput: z.string().min(1, {
    message: "expectedOutput is required.",
  }),
  isPrivate: z.boolean(),
  id: z.string().optional(),
});
type TestCaseFormValues = z.infer<typeof testCaseFormSchema>;

export function CreateProblemTestCaseForm({
  onSave,
  onCancel,
  initialValues,
}: {
  onSave: (testCase: TestCaseFormValues) => void;
  onCancel?: () => void;
  initialValues?: TestCaseFormValues;
}) {
  const { id } = useParams();
  const problemId = Array.isArray(id) ? id[0] : id;
  const form = useForm<TestCaseFormValues>({
    resolver: zodResolver(testCaseFormSchema),
    defaultValues: initialValues || {
      inputData: "",
      expectedOutput: "",
      isPrivate: false,
    },
  });

  const { control, handleSubmit, getValues, reset } = form;
  const [createOrUpdateTestCase, { isLoading }] =
    useCreateorupdateTestcaseMutation();
  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        inputData: Array.isArray(initialValues.inputData)
          ? initialValues.inputData.join("\n")
          : initialValues.inputData,
      });
    }
  }, [initialValues, reset]);

  const onSubmitTestCase = async () => {
    const values = getValues();
    const inputValues = values.inputData
      .split("\n")
      .map((input) => input.trim())
      .filter((input) => input !== "");
    if (inputValues.length === 0 || !values.expectedOutput.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await createOrUpdateTestCase({
        id: initialValues?.id,
        problemId,
        inputData: inputValues.join("\n"),
        expectedOutput: values.expectedOutput,
        isPrivate: values.isPrivate,
      }).unwrap();
      toast.success(
        initialValues
          ? "Test case updated successfully."
          : "Test case added successfully.",
      );

      reset();

      if (onSave) {
        onSave({
          id: response?.result?.id || initialValues?.id,
          inputData: values.inputData,
          expectedOutput: values.expectedOutput,
          isPrivate: values.isPrivate,
        });
      }
    } catch (error) {
      toast.error("Failed to submit test case.");
    }
  };
  return (
    <Form {...form}>
      <FormField
        control={control}
        name="inputData"
        render={({ field }) => (
          <FormItem>
            <FormLabel>inputData (each line is one input)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter test case inputData, each line is a separate input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="expectedOutput"
        render={({ field }) => (
          <FormItem>
            <FormLabel>expectedOutput</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter the expected expectedOutput"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="isPrivate"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <FormLabel>Public</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-4 flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            reset();
            if (onCancel) {
              onCancel();
            }
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          type="submit"
          onClick={handleSubmit(onSubmitTestCase)}
        >
          {initialValues ? "Update Test Case" : "Add Test Case"}
        </Button>
      </div>
    </Form>
  );
}
