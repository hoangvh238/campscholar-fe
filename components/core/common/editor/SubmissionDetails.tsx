"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/core/common/alert";
import { Badge } from "@/components/core/common/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { ScrollArea } from "@/components/core/common/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core/common/tabs";
import { SubmissionResult } from "@/types/submitsion";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  FileText,
  MemoryStickIcon as Memory,
  RotateCcw,
  Terminal,
  Timer,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface SubmissionDetailsProps {
  submissionData?: SubmissionResult | null;
  errorMessage?: string;
  slot?: any;
}

export function SubmissionDetails({
  slot,
  submissionData,
  errorMessage,
}: SubmissionDetailsProps) {
  const [tabs, setTabs] = useState<string[]>(["description"]);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (submissionData || errorMessage) {
      setTabs((prevTabs) => {
        if (!prevTabs.includes("submission")) {
          return [...prevTabs, "submission"];
        }
        return prevTabs;
      });
      setActiveTab("submission");
    } else {
      setTabs(["description"]);
      setActiveTab("description");
    }
  }, [submissionData, errorMessage]);

  const getStatusColor = (passRate: number) => {
    if (passRate === 1) return "text-green-500 dark:text-green-400";
    if (passRate >= 0.6) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const getStatusIcon = (passRate: number) => {
    if (passRate === 1) return <CheckCircle2 className="h-5 w-5" />;
    if (passRate >= 0.6) return <AlertTriangle className="h-5 w-5" />;
    return <XCircle className="h-5 w-5" />;
  };

  const passRate = submissionData
    ? submissionData.totalPassedTestCases / submissionData.totalTestCases
    : 0;

  const chartData = submissionData
    ? [
        { name: "Passed", value: submissionData.totalPassedTestCases },
        {
          name: "Failed",
          value:
            submissionData.totalTestCases - submissionData.totalPassedTestCases,
        },
      ]
    : [];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="flex h-full flex-col rounded-t-md bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex h-full flex-col rounded-t-md"
      >
        <div className="border-mb-2 rounded-t-md border-gray-200 bg-white dark:border-gray-700">
          <TabsList className="w-full flex-wrap justify-start rounded-b-none rounded-t-md px-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
              >
                {tab === "description" ? (
                  <FileText className="h-4 w-4" />
                ) : (
                  <Terminal className="h-4 w-4" />
                )}
                {tab === "description" ? "Description" : "Submission"}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <ScrollArea className="flex-grow">
          <TabsContent value="description" className="m-0 p-4">
            {slot}
          </TabsContent>

          <TabsContent value="submission" className="m-0 p-4">
            {submissionData ? (
              <div className="space-y-6">
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                {/* Status Header */}
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2 dark:bg-gray-800">
                    <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={getStatusColor(passRate)}>
                          {getStatusIcon(passRate)}
                        </div>
                        <CardTitle className="text-lg">
                          Submission Results
                        </CardTitle>
                      </div>
                      <Badge
                        variant={passRate === 1 ? "default" : "secondary"}
                        className="self-start sm:self-center"
                      >
                        {submissionData.totalPassedTestCases}/
                        {submissionData.totalTestCases} Tests Passed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      <MetricCard
                        icon={<Award className="h-4 w-4 text-primary" />}
                        label="Score"
                        value={submissionData.score.toFixed(2)}
                      />
                      <MetricCard
                        icon={<Timer className="h-4 w-4 text-primary" />}
                        label="Runtime"
                        value={`${submissionData.runtime.toFixed(2)}ms`}
                      />
                      <MetricCard
                        icon={<Memory className="h-4 w-4 text-primary" />}
                        label="Memory"
                        value={`${submissionData.totalMemoryUsageInMB.toFixed(2) === "0.00" ? "<" : ""}${submissionData.totalMemoryUsageInMB.toFixed(2) === "0.00" ? "0.01" : submissionData.totalMemoryUsageInMB.toFixed(2)}MB`}
                      />
                      <MetricCard
                        icon={<RotateCcw className="h-4 w-4 text-primary" />}
                        label="Submissions"
                        value={submissionData.submissionCount}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Test Cases Overview */}
                <Card>
                  <div className="p-6">
                    <h3 className="mb-6 text-lg font-semibold">
                      Test Cases Overview
                    </h3>
                    <div className="flex items-start gap-12">
                      <div className="h-[180px] w-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            >
                              {chartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                  strokeWidth={0}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                          <span>
                            Passed: {submissionData.totalPassedTestCases}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
                          <span>
                            Failed:{" "}
                            {submissionData.totalTestCases -
                              submissionData.totalPassedTestCases}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <div className="h-3 w-3 rounded-full bg-gray-400" />
                          <span>Total: {submissionData.totalTestCases}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Performance Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <PerformanceBar
                        label="Runtime Efficiency"
                        value={submissionData.runtime}
                        maxValue={10}
                        unit="ms"
                      />
                      <PerformanceBar
                        label="Memory Usage"
                        value={submissionData.totalMemoryUsageInMB}
                        maxValue={16}
                        unit="MB"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <div className="rounded-full bg-primary/10 p-2 dark:bg-primary/20">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function PerformanceBar({
  label,
  value,
  maxValue,
  unit,
}: {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
}) {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>{label}</span>
        <span>
          {value.toFixed(2)}
          {unit} / {maxValue}
          {unit}
        </span>
      </div>
      <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          <div className="flex h-full items-center justify-center">
            <span className="px-2 text-xs font-semibold text-white">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
