"use client"
import { useState } from "react"
import { Button } from "@/components/core/common/button"
import { Textarea } from "@/components/core/common/textarea"
import { Input } from "@/components/core/common/input"
import { Card, CardContent } from "@/components/core/common/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/core/common/tabs"
import { Sparkles, Code, Eye, ArrowRight, Plus, Trash2, Copy, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { AIPromptDialog } from "./ai-prompt-dialog"

interface Example {
  id: string
  input: string
  output: string
  explanation: string
}

interface Constraint {
  id: string
  value: string
}

interface Note {
  id: string
  value: string
}

interface FollowUp {
  id: string
  value: string
}

interface IntelligentFormProps {
  onGenerateMarkdown: (markdown: string) => void
  currentMarkdown: string
}

export default function IntelligentFormV2({ onGenerateMarkdown, currentMarkdown }: IntelligentFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    inputFormat: "",
    inputExample: "",
    outputFormat: "",
    outputExample: "",
    examples: [] as Example[],
    constraints: [] as Constraint[],
    functionSignature: "",
    notes: [] as Note[]  
})

  const [activeTab, setActiveTab] = useState("form")
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewMarkdown, setPreviewMarkdown] = useState(currentMarkdown)
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  
  // Helper functions for managing arrays
  const addExample = () => {
    const newExample = {
      id: `example-${Date.now()}`,
      input: "",
      output: "",
      explanation: "",
    }
    setFormData((prev) => ({
      ...prev,
      examples: [...prev.examples, newExample],
    }))
  }

  const removeExample = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.filter((ex) => ex.id !== id),
    }))
  }

  const updateExample = (id: string, field: keyof Example, value: string) => {
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)),
    }))
  }

  const addConstraint = () => {
    const newConstraint = {
      id: `constraint-${Date.now()}`,
      value: "",
    }
    setFormData((prev) => ({
      ...prev,
      constraints: [...prev.constraints, newConstraint],
    }))
  }

  const removeConstraint = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      constraints: prev.constraints.filter((c) => c.id !== id),
    }))
  }

  const updateConstraint = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      constraints: prev.constraints.map((c) => (c.id === id ? { ...c, value } : c)),
    }))
  }

  const addNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      value: "",
    }
    setFormData((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }))
  }

  const removeNote = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
    }))
  }

  const updateNote = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.id === id ? { ...n, value } : n)),
    }))
  }


  const onDragEnd = (result: any, listKey: "examples" | "constraints" | "notes") => {
    if (!result.destination) return
  
    const items = Array.isArray(formData[listKey]) ? [...formData[listKey]] : []
  
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
  
    setFormData((prev) => ({
      ...prev,
      [listKey]: items as Example[] | Constraint[] | Note[],
    }))
  }
  

  const generateMarkdown = () => {
    const markdown = `### **Description:**
${formData.description || "{Detailed description of the problem. Explain the scenario, requirements, and objective clearly.}"}

---

### **Input:**
- ${formData.inputFormat || "{Description of input format, including constraints.}"}
- Example:
\`\`\`
${formData.inputExample || "{Example Input}"}
\`\`\`

### **Output:**
- ${formData.outputFormat || "{Description of output format.}"}
- Example:
\`\`\`
${formData.outputExample || "{Example Output}"}
\`\`\`

---

### **Examples:**

${formData.examples
  .map(
    (ex, index) => `Example ${index + 1}:
\`\`\`
Input: ${ex.input || "{Example Input}"}
Output: ${ex.output || "{Example Output}"}
Explanation: ${ex.explanation || "{Explanation}"}
\`\`\`
`,
  )
  .join("\n")}

---

### **Constraints:**
${formData.constraints.map((c) => `- ${c.value || "{Constraint}"}`).join("\n")}

---

### **Function Signature:**
\`\`\`cpp
${formData.functionSignature || "{ReturnType} {FunctionName}({Parameter List});"}
\`\`\`

---

### **Notes:**
${formData.notes.map((n) => `- ${n.value || "{Note}"}`).join("\n")}

---
`

    setPreviewMarkdown(markdown)
    setActiveTab("preview")
    toast.success("Markdown generated successfully!")
  }

  const parseAIResponse = (response: string) => {
    try {
      // This is a simplified parser - you would need a more robust one in production
      const sections = response.split("---")

      const description = sections[0].match(/### \*\*Description:\*\*\n([\s\S]*?)(?=\n\n|$)/)?.[1] || ""

      const inputSection = sections[1].match(/### \*\*Input:\*\*\n- (.*?)\n- Example:\n```\n([\s\S]*?)```/s)
      const inputFormat = inputSection?.[1] || ""
      const inputExample = inputSection?.[2] || ""

      const outputSection = sections[1].match(/### \*\*Output:\*\*\n- (.*?)\n- Example:\n```\n([\s\S]*?)```/s)
      const outputFormat = outputSection?.[1] || ""
      const outputExample = outputSection?.[2] || ""

      // Parse examples
      const examplesSection = sections[2]
      const exampleMatches = examplesSection.matchAll(
        /Example \d+:\n```\nInput: (.*?)\nOutput: (.*?)\nExplanation: (.*?)\n```/gs,
      )
      const examples = Array.from(exampleMatches).map((match) => ({
        id: `example-${Date.now()}-${Math.random()}`,
        input: match[1],
        output: match[2],
        explanation: match[3],
      }))

      // Parse constraints
      const constraintsSection = sections[3]
      const constraints =
        constraintsSection.match(/- (.*)/g)?.map((c) => ({
          id: `constraint-${Date.now()}-${Math.random()}`,
          value: c.replace("- ", ""),
        })) || []

      // Parse function signature
      const functionSignature = sections[4].match(/```cpp\n(.*?)\n```/s)?.[1] || ""

      // Parse notes
      const notesSection = sections[5]
      const notes =
        notesSection.match(/- (.*)/g)?.map((n) => ({
          id: `note-${Date.now()}-${Math.random()}`,
          value: n.replace("- ", ""),
        })) || []

      // Parse follow-ups
      const followUpsSection = sections[6]
      const followUps =
        followUpsSection.match(/- (.*)/g)?.map((f) => ({
          id: `followup-${Date.now()}-${Math.random()}`,
          value: f.replace("- ", ""),
        })) || []

      setFormData({
        description,
        inputFormat,
        inputExample,
        outputFormat,
        outputExample,
        examples,
        constraints,
        functionSignature,
        notes,
      })
    } catch (error) {
      console.error("Error parsing AI response:", error)
      toast.error("Failed to parse AI response")
    }
  }

  const generateWithAI = async () => {
    setIsGenerating(true)

    try {
      // Simulated AI response
      const aiResponse = `### **Description:**
Given an array of integers, find the two numbers that add up to a specific target. Return the indices of these two numbers.

---

### **Input:**
- The first line contains an integer n (2 ≤ n ≤ 10^5), representing the size of the array.
- The second line contains n space-separated integers nums[i] (-10^9 ≤ nums[i] ≤ 10^9).
- The third line contains a single integer target (-10^9 ≤ target ≤ 10^9).
- Example:
\`\`\`
4
2 7 11 15
9
\`\`\`

### **Output:**
- Print two space-separated integers - the indices of the two numbers that add up to the target.
- The indices should be 1-based.
- Example:
\`\`\`
1 2
\`\`\`

---

### **Examples:**

Example 1:
\`\`\`
Input: 4
2 7 11 15
9
Output: 1 2
Explanation: nums[0] + nums[1] = 2 + 7 = 9, so we return indices 1 and 2.
\`\`\`

Example 2:
\`\`\`
Input: 3
3 2 4
6
Output: 2 3
Explanation: nums[1] + nums[2] = 2 + 4 = 6, so we return indices 2 and 3.
\`\`\`

Example 3:
\`\`\`
Input: 2
3 3
6
Output: 1 2
Explanation: nums[0] + nums[1] = 3 + 3 = 6, so we return indices 1 and 2.
\`\`\`

---

### **Constraints:**
- 2 ≤ n ≤ 10^5
- -10^9 ≤ nums[i] ≤ 10^9
- -10^9 ≤ target ≤ 10^9
- The input is guaranteed to have exactly one solution
- The same element cannot be used twice

---

### **Function Signature:**
\`\`\`cpp
vector<int> twoSum(vector<int>& nums, int target);
\`\`\`

---

### **Notes:**
- The solution must run in O(n) time complexity
- You may assume that each input has exactly one solution
- You may not use the same element twice

---

### **Follow-Up:**
- Can you implement a solution with O(1) extra space complexity?
- What if the array is sorted? How would you optimize your solution?
- Can you extend this to find three numbers that sum to the target?
`

      // Parse the AI response and update the form
      parseAIResponse(aiResponse)

      setPreviewMarkdown(aiResponse)
      setActiveTab("preview")
      toast.success("AI content generated successfully!")
    } catch (error) {
      console.error("Error generating with AI:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewMarkdown)
      toast.success("Copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Intelligent Problem Form</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAIDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate with AI
          </Button>
        </div>
      </div>

      <AIPromptDialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen} onGenerate={generateWithAI} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="form" className="flex items-center gap-2">
            Form
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <Textarea
                    placeholder="Detailed description of the problem. Explain the scenario, requirements, and objective clearly."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Input Format</h4>
                    <Textarea
                      placeholder="Description of input format, including constraints."
                      value={formData.inputFormat}
                      onChange={(e) => setFormData((prev) => ({ ...prev, inputFormat: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Input Example</h4>
                    <Textarea
                      placeholder="Example Input"
                      value={formData.inputExample}
                      onChange={(e) => setFormData((prev) => ({ ...prev, inputExample: e.target.value }))}
                      rows={3}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Output Format</h4>
                    <Textarea
                      placeholder="Description of output format."
                      value={formData.outputFormat}
                      onChange={(e) => setFormData((prev) => ({ ...prev, outputFormat: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Output Example</h4>
                    <Textarea
                      placeholder="Example Output"
                      value={formData.outputExample}
                      onChange={(e) => setFormData((prev) => ({ ...prev, outputExample: e.target.value }))}
                      rows={3}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium">Examples</h4>
                <Button variant="outline" size="sm" onClick={addExample} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Example
                </Button>
              </div>

              <DragDropContext onDragEnd={(result) => onDragEnd(result, "examples")}>
                <Droppable droppableId="examples">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {formData.examples.map((example, index) => (
                        <Draggable key={example.id} draggableId={example.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border rounded-lg p-4 bg-card"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="flex items-center gap-2 text-sm font-medium"
                                >
                                  <ArrowUpDown className="w-4 h-4" />
                                  Example {index + 1}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeExample(example.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-2">
                                <Textarea
                                  placeholder="Input"
                                  value={example.input}
                                  onChange={(e) => updateExample(example.id, "input", e.target.value)}
                                  className="font-mono"
                                />
                                <Textarea
                                  placeholder="Output"
                                  value={example.output}
                                  onChange={(e) => updateExample(example.id, "output", e.target.value)}
                                  className="font-mono"
                                />
                                <Textarea
                                  placeholder="Explanation"
                                  value={example.explanation}
                                  onChange={(e) => updateExample(example.id, "explanation", e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium">Constraints</h4>
                <Button variant="outline" size="sm" onClick={addConstraint} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Constraint
                </Button>
              </div>

              <DragDropContext onDragEnd={(result) => onDragEnd(result, "constraints")}>
                <Droppable droppableId="constraints">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {formData.constraints.map((constraint, index) => (
                        <Draggable key={constraint.id} draggableId={constraint.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-2"
                            >
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <ArrowUpDown className="w-4 h-4" />
                              </div>
                              <Input
                                value={constraint.value}
                                onChange={(e) => updateConstraint(constraint.id, e.target.value)}
                                placeholder="Enter constraint"
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeConstraint(constraint.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h4 className="text-sm font-medium mb-2">Function Signature</h4>
              <Textarea
                placeholder="ReturnType FunctionName(Parameter List);"
                value={formData.functionSignature}
                onChange={(e) => setFormData((prev) => ({ ...prev, functionSignature: e.target.value }))}
                className="font-mono"
                rows={2}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium">Notes</h4>
                <Button variant="outline" size="sm" onClick={addNote} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Note
                </Button>
              </div>

              <DragDropContext onDragEnd={(result) => onDragEnd(result, "notes")}>
                <Droppable droppableId="notes">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {formData.notes.map((note, index) => (
                        <Draggable key={note.id} draggableId={note.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-2"
                            >
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <ArrowUpDown className="w-4 h-4" />
                              </div>
                              <Input
                                value={note.value}
                                onChange={(e) => updateNote(note.id, e.target.value)}
                                placeholder="Enter note"
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNote(note.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            <Button onClick={generateMarkdown} disabled={isGenerating} className="flex items-center gap-2">
              {isGenerating ? "Generating..." : "Generate Markdown"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium">Preview</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("form")}>
                    Back to Form
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-6 bg-gray-50 dark:bg-gray-900 overflow-auto max-h-[600px] prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: previewMarkdown }} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button onClick={() => onGenerateMarkdown(previewMarkdown)} className="flex items-center gap-2">
              Apply to Editor
              <Code className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

