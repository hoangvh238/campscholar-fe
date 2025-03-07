"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PlusIcon, Pencil, Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/core/common/table"
import { Button } from "@/components/core/common/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/core/common/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/core/common/card"
import { useGettestcasebyproblemidQuery, useDeletetestcasebyidMutation } from "@/store/queries/testcase"
import { CreateProblemTestCaseForm } from "./test-case-form"
import { Badge } from "@/components/core/common/badge"

export default function CreateTestcaseForm() {
  const { id } = useParams()
  const problemId = Array.isArray(id) ? id[0] : id
  const { data: fetchedTestCases, isLoading } = useGettestcasebyproblemidQuery(problemId, {
    refetchOnMountOrArgChange: true,
  })

  const [testCases, setTestCases] = useState<
    Array<{
      id?: string
      inputData: string
      expectedOutput: string
      isPrivate: boolean
    }>
  >([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editTestCase, setEditTestCase] = useState<null | {
    id?: string
    index: number
    data: { id?: string; inputData: string; expectedOutput: string; isPrivate: boolean }
  }>(null)

  const [deleteTestCase] = useDeletetestcasebyidMutation()

  useEffect(() => {
    if (fetchedTestCases?.result) {
      setTestCases(fetchedTestCases.result)
    }
  }, [fetchedTestCases])

  const handleAddTestCase = (newTestCase: {
    id?: string
    inputData: string
    expectedOutput: string
    isPrivate: boolean
  }) => {
    setTestCases((prev) => [...prev, newTestCase])
    setIsAddDialogOpen(false)
  }

  const handleUpdateTestCase = (updatedTestCase: {
    id?: string
    inputData: string
    expectedOutput: string
    isPrivate: boolean
  }) => {
    if (editTestCase !== null) {
      setTestCases((prev) => prev.map((tc, i) => (i === editTestCase.index ? updatedTestCase : tc)))
      setEditTestCase(null)
    }
  }

  const handleDeleteTestCase = async (testCaseId: string) => {
    try {
      await deleteTestCase(testCaseId).unwrap()
      setTestCases((prev) => prev.filter((tc) => tc.id !== testCaseId))
    } catch (error) {
      console.error("Failed to delete test case", error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Test Cases</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Add Test Case
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Test Case</DialogTitle>
            </DialogHeader>
            <CreateProblemTestCaseForm onCancel={() => setIsAddDialogOpen(false)} onSave={handleAddTestCase} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Input Data</TableHead>
              <TableHead>Expected Output</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No test cases available
                </TableCell>
              </TableRow>
            ) : (
              testCases.map((testCase, index) => (
                <TableRow key={testCase.id || index}>
                  <TableCell className="font-mono">{testCase.inputData}</TableCell>
                  <TableCell className="font-mono">{testCase.expectedOutput}</TableCell>
                  <TableCell>
                    <Badge variant={testCase.isPrivate ? "secondary" : "default"}>
                      {testCase.isPrivate ? "Private" : "Public"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditTestCase({ id: testCase.id, index, data: testCase })}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      {editTestCase && editTestCase.index === index && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Test Case</DialogTitle>
                          </DialogHeader>
                          <CreateProblemTestCaseForm initialValues={editTestCase.data} onSave={handleUpdateTestCase} />
                        </DialogContent>
                      )}
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => testCase.id && handleDeleteTestCase(testCase.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

