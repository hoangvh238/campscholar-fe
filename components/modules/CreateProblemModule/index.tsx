"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import Editor from "./editor"
import CategorySelectionPopup from "./category-form"
import IntelligentForm from "./intelligent-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/core/common/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core/common/select"
import { Input } from "@/components/core/common/input"
import { Button } from "@/components/core/common/button"
import { useUpdateProblemMutation } from "@/store/queries/problem"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/core/common/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/common/tabs"
import { Sparkles, Edit3 } from "lucide-react"

const problemFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must not be longer than 100 characters." }),
  prompt: z.string().min(8, { message: "You must enter a problem statement." }),
  point: z.number().int().positive({ message: "Point must be a positive integer." }),
  difficulty: z
    .enum(["Easy", "Medium", "Hard", ""])
    .default("")
    .refine((value) => value !== "", {
      message: "Difficulty must be selected.",
    }),
  category: z.array(z.string()).min(1, "Category must have at least one item").default([]),
})

const defaultValues: Partial<ProblemFormValues> = {
  title: "",
  prompt: "",
  point: undefined,
  difficulty: undefined,
  category: [],
}
type ProblemFormValues = z.infer<typeof problemFormSchema>

export default function CreateProblemForm() {
  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(problemFormSchema),
    defaultValues,
    mode: "onSubmit",
  })

  const router = useRouter()
  const [formMode, setFormMode] = useState<"editor" | "intelligent">("editor")
  const [generatedMarkdown, setGeneratedMarkdown] = useState("")

  const [createOrUpdateProblem, { isLoading: isUploading }] = useUpdateProblemMutation()

  const handleCreateProblem = form.handleSubmit(async (data: ProblemFormValues) => {
    const payload = {
      name: data.title,
      difficultyLevel: data.difficulty,
      point: data.point,
      prompt: data.prompt,
      categoryIds: selectedCategories,
    }

    try {
      const response = await createOrUpdateProblem(payload).unwrap()
      toast.success("Problem created successfully!")
      const id = response.result
      router.replace(`/administration/problems/edit/${id}`)
    } catch (error) {
      console.error("Error creating problem:", error)
      const errMessage = (error as { data?: { message?: string } })?.data?.message || "Unknown error"
      toast.error(`Failed to create problem: ${errMessage}`)
    }
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    form.setValue("category", selectedCategories)
    form.clearErrors("category")
  }, [selectedCategories, form])

  useEffect(() => {
    if (generatedMarkdown) {
      form.setValue("prompt", generatedMarkdown)
    }
  }, [generatedMarkdown, form])

  return (
    <Form {...form}>
      <form className="grid min-h-full gap-6 p-2 md:grid-cols-2" onSubmit={handleCreateProblem}>
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
                      <Input {...field} id="title" placeholder="e.g. Add Two Numbers" type="text" />
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
                        onChange={(event) => field.onChange(Number.parseInt(event.target.value))}
                      />
                    </FormControl>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Assign a point value for this problem.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormDescription>Points awarded for solving the problem.</FormDescription>
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
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
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
              <FormLabel>Categories</FormLabel>
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
        <div className="col-span-2">
          <Tabs
            defaultValue="editor"
            value={formMode}
            onValueChange={(value) => setFormMode(value as "editor" | "intelligent")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Standard Editor
              </TabsTrigger>
              <TabsTrigger value="intelligent" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Intelligent Form
              </TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="mt-0">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        content={field.value}
                        placeholder="Enter the prompt here..."
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormDescription>Supports Latex and Markdown.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="intelligent" className="mt-0">
              <IntelligentForm onGenerateMarkdown={setGeneratedMarkdown} currentMarkdown={form.getValues("prompt")} />
            </TabsContent>
          </Tabs>
        </div>
        <Button className="mt-2 w-1/2 self-end" type="submit" disabled={isUploading}>
          {isUploading ? "Creating..." : "Create Problem"}
        </Button>
      </form>
    </Form>
  )
}

