"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

import CategorySelectionPopup from "../CreateProblemModule/category-form";
import Editor from "../CreateProblemModule/editor";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/common/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/core/common/select";
import { Input } from "@/components/core/common/input";
import { Button } from "@/components/core/common/button";
import { useGetProblemByIdQuery } from "@/store/queries/problem";
import { useDownloadFileQuery } from "@/store/queries/minioStorage";
import { BUCKET_TYPE } from "@/settings/bucketType";
import { useUpdateProblemMutation } from "@/store/queries/problem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/common/tooltip";

const problemFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must not be longer than 100 characters." }),
  prompt: z.string().min(8, { message: "You must enter a problem statement." }),
  point: z
    .number()
    .int()
    .positive({ message: "Point must be a positive integer." }),
  difficulty: z
    .enum(["Easy", "Medium", "Hard", ""])
    .default("")
    .refine((value) => value !== "", {
      message: "Difficulty must be selected.",
    }),
  category: z
    .array(z.string())
    .min(1, "Category must have at least one item")
    .default([]),
});

const defaultValues: Partial<ProblemFormValues> = {
  title: "",
  point: 0,
  difficulty: undefined,
  category: [],
  prompt: "",
};
type ProblemFormValues = z.infer<typeof problemFormSchema>;

export default function UpdateProblemForm() {
  const { id } = useParams();
  const problemId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, error } = useGetProblemByIdQuery(problemId);
  const [createOrUpdateProblem] = useUpdateProblemMutation();
  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(problemFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
    if (!data) return;
    setTimeout(() => {
      form.reset({
        title: data.result.name,
        point: data.result.point || 0,
        difficulty: data.result.difficultyLevel,
        category: data.result.categories.map((cat: any) => cat.id),
      });
      setSelectedCategories(data.result.categories.map((cat: any) => cat.id));
    }, 50);
  }, [data, form]);

  const bucketName = BUCKET_TYPE.PROBLEMS;
  const objectName = data?.result?.problemFileName;

  const {
    data: fileData,
    error: fileError,
    isFetching,
  } = useDownloadFileQuery(
    objectName ? { bucketName, objectName } : skipToken,
    {
      skip: !objectName,
    },
  );
  useEffect(() => {
    setTimeout(() => {
      if (fileData && fileData instanceof Blob) {
        fileData.text().then((text) => {
          console.log("Downloaded Markdown Content:", text);
          form.setValue("prompt", text);
          console.log(form.getValues());
        });
      }
    }, 50);
  }, [fileData, form]);

  if (fileError) {
    console.error("Error downloading file:", fileError);
  }

  if (isFetching) {
    console.log("Downloading file...");
  }

  if (isLoading) return <p>Loading problem details...</p>;
  if (error) return <p>Error loading problem: {JSON.stringify(error)}</p>;

  const handleUpdateProblem = async (data: ProblemFormValues) => {
    const payload = {
      id: problemId,
      name: data.title,
      difficultyLevel: data.difficulty,
      point: data.point,
      prompt: data.prompt,
      categoryIds: selectedCategories,
    };
    try {
      const response = await createOrUpdateProblem(payload).unwrap();
      toast.success("Update Problem successfully");
    } catch (error) {
      console.error("Error update problem:", error);
      const errMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Unknown error";
      toast.error(`Failed to create problem: ${errMessage}`);
    }
  };
  return (
    <Form {...form}>
      <form className="grid min-h-full gap-6 p-2 md:grid-cols-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title">Title</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormControl>
                      <Input
                        {...field}
                        id="title"
                        placeholder="e.g. Add Two Numbers"
                        type="text"
                      />
                    </FormControl>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter a meaningful title for the problem.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormDescription>The title of the problem.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="point"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="point">Point of problem</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormControl>
                      <Input
                        {...field}
                        id="point"
                        type="number"
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                      />
                    </FormControl>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Assign a point value for this problem.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormDescription>
                Points awarded for solving the problem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Select
                      value={form.watch("difficulty") || ""}
                      onValueChange={(value) =>
                        form.setValue(
                          "difficulty",
                          value as "Easy" | "Medium" | "Hard",
                        )
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose the difficulty level of the problem.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormDescription>The difficulty of the problem.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="category">Categories</FormLabel>
              <FormControl>
                <CategorySelectionPopup
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel htmlFor="prompt">Prompt</FormLabel>
              <FormControl>
                <Editor
                  content={form.watch("prompt") || ""}
                  placeholder="Enter the prompt here..."
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>Supports Latex and Markdown.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-2 w-1/2 self-end"
          type="button"
          onClick={form.handleSubmit((data) => {
            handleUpdateProblem(data);
          })}
        >
          Update Problem
        </Button>
      </form>
    </Form>
  );
}
