"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/core/common/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/core/common/table";
import { Button } from "@/components/core/common/button";
import { Badge } from "@/components/core/common/badge";
import { Textarea } from "@/components/core/common/textarea";
import { Input } from "@/components/core/common/input";
import { submissions } from "@/lib/data";
import { useParams } from "next/navigation";
export default function SubmissionReviewPage() {
  const { classroomId, studentId, submissionId } = useParams();

  // Find the submission by ID
  const submission =
    submissions.find((s) => s.id === submissionId) || submissions[0];

  const [feedback, setFeedback] = useState(submission.feedback);
  const [score, setScore] = useState(submission.score.toString());

  const handleSaveFeedback = () => {
    alert("Feedback saved successfully!");
    // In a real app, this would save the feedback to the database
  };

  return (
    <div className="min-h-screen w-full space-y-2 p-6 pb-4">
      <div>
        <Button variant="outline" size="sm" asChild className="mb-2">
          <Link href={`/student/${studentId}?class=${classroomId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Student Progress
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Submission Review</h1>
        <p className="mt-1 text-muted-foreground">
          Problem: {submission.problemName}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Student Code:</div>
                <div className="col-span-2">{submission.studentCode}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Student Name:</div>
                <div className="col-span-2">{submission.studentName}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Problem:</div>
                <div className="col-span-2">{submission.problemName}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Execution Time:</div>
                <div className="col-span-2">{submission.executionTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score and Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Score (out of 5)
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="5"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-24"
                  />
                  <Button onClick={() => alert("Score updated!")}>
                    Update Score
                  </Button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Instructor Feedback
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Provide feedback to the student..."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveFeedback} className="w-full">
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Code Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-auto rounded-md bg-muted p-4">
            <pre className="text-sm">
              <code>{submission.code}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Cases Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Case</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Actual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submission.testCases.map((testCase, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{testCase.name}</TableCell>
                  <TableCell>
                    {testCase.status === "Passed" ? (
                      <Badge
                        variant="success"
                        className="flex w-fit items-center gap-1"
                      >
                        <Check className="h-3 w-3" />
                        Passed
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="flex w-fit items-center gap-1"
                      >
                        <X className="h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {testCase.expected}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {testCase.actual}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
