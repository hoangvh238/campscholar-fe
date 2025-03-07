"use client";
import { Editor } from "@monaco-editor/react";
import {
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Image from "next/image";

import { BentoGrid, BentoGridItem } from "@/components/core/common/bento-grid";
import { Card } from "@/components/core/common/card";
import { ContestCard } from "@/components/core/common/contests/contest-card";
import { RecentSubmissionDummyCard } from "@/components/core/common/submit/recent-submissions-dummy";
import { SubmissionMock } from "@/types/submitsion";
import { cn } from "@/utils/cn";

export function WhyCampScholar() {
  return (
    <section className="py-20" id="features">
      <h1 className="mx-auto w-full max-w-3xl px-6 text-center font-sans text-2xl font-medium md:text-4xl">
        CampScholar offers all the tools you need to{" "}
        <span className="bg-gradient-to-r from-osu to-osu bg-clip-text font-serif font-semibold italic text-transparent">
          {" "}
          host, participate in, and organize{" "}
        </span>
        programming contests.
      </h1>

      <div className="my-12 flex h-full w-full flex-col items-center justify-center p-3">
        <BentoGrid className="mx-auto max-w-6xl">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              className={i === 0 || i === 3 ? "md:col-span-2" : "cols-span-3"}
              description={item.description}
              header={item.header}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />
);

const mergeSort = `function merge(left: number[], right: number[]): number[] {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
        } else {
        result.push(right[rightIndex]);
        rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function main() {
  const input = [3, 5, 1, 4, 2];
  const sorted = mergeSort(input);
  console.log(sorted);
}`;

const selectionSort = `function selectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}

function main() {
    const input = [3, 5, 1, 4, 2];
    const sorted = selectionSort(input);
    console.log(sorted);
}`;
interface DummyCodeEditorProps {
  mock?: boolean;
  sourceCode?: string;
  language?: string;
}

export const DummyCodeEditor = ({
  mock,
  sourceCode,
  language,
}: DummyCodeEditorProps) => {
  const { resolvedTheme } = useTheme();
  // TODO: Handle edge case when this is rendered on mobile
  return (
    <Card className={cn("flex flex-col items-center p-2")}>
      <Editor
        className={cn(
          { "pointer-events-none select-none rounded shadow-none": mock },
          "h-full w-full",
        )}
        defaultLanguage={language ?? "typescript"}
        defaultValue={mock ? mergeSort : sourceCode}
        height={mock ? "485px" : "370px"}
        options={{
          lineNumbers: "on",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
        theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
        width={"100%"}
      />
    </Card>
  );
};

const ContestImage = () => {
  return (
    <>
      <Card className={cn("flex flex-col items-center p-1")}>
        <Image
          alt="contest"
          className="w-max"
          height={300}
          src={"/contest.png"}
          width={500}
        />
      </Card>
    </>
  );
};

const MicroserviceLogo = () => {
  return (
    <>
      <Card className={cn("flex flex-col items-center")}>
        <Image
          alt="microservice"
          className="scale-115 w-[46rem]"
          height={202}
          src="/gif/micro-service.gif"
          width={200}
        />
        <h3 className="mb-2 font-semibold">Powered By Microservices</h3>
      </Card>
    </>
  );
};

const ProblemPreview = () => {
  return (
    <>
      <Card className={cn("flex flex-col items-center p-1")}>
        <Image
          alt="problem"
          className="w-max"
          height={300}
          src={"/problem.png"}
          width={500}
        />
      </Card>
    </>
  );
};

const ThemeSelector = () => {
  return (
    <>
      <Card className={cn("flex flex-col items-center border-none")}>
        <Image
          alt="selector"
          className="h-full w-full rounded"
          height={300}
          src="/selector.png"
          width={500}
        />
      </Card>
    </>
  );
};

const mockProblems = [
  { title: "Problem 1" },
  { title: "Problem 2" },
  { title: "Problem 3" },
];

const mockComps = [
  {
    startTime: "2024-12-15T08:00:00Z", // Start time of the contest
    endTime: "2024-12-15T16:00:00Z", // End time of the contest
    description:
      "The annual programming contest organized by FPT University. Location: Innovation Building, FPT University, Hoa Lac, Hanoi.",
    title: "FPT University Student Programming Contest",
    problems: mockProblems, // List of contest problems
    participants: [], // List of participants
  },
];

const ContestCardPreview = () => {
  return (
    <Card className={cn("flex flex-col items-center border-none")}>
      <ContestCard mock contest={mockComps[0]} />
    </Card>
  );
};
export const mockSubmissions: any[] = [
  {
    id: "1",
    problem: { title: "First Bad Version" },
    language: { name: "TypeScript" },
    submit_time: "2024-11-29 14:00:00",
    status: "ACCEPTED",
  },
  {
    id: "2",
    problem: { title: "Cherry Pickup II" },
    language: { name: "Rust" },
    submit_time: "2024-11-29 15:30:00",
    status: "WRONG_ANSWER",
  },
  {
    id: "3",
    problem: { title: "Xen Tree" },
    language: { name: "Swift" },
    submit_time: "2024-11-29 16:45:00",
    status: "ACCEPTED",
  },
  {
    id: "4",
    problem: { title: "Intersection of Two Arrays" },
    language: { name: "Go" },
    submit_time: "2024-11-29 17:10:00",
    status: "ACCEPTED",
  },
];

const ThreeSubmissionsCard = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {mockSubmissions.map((submission: SubmissionMock) => (
        <RecentSubmissionDummyCard
          key={submission.id}
          submission={submission}
        />
      ))}
    </div>
  );
};
export const items = [
  {
    title: "Code Editor",
    description:
      "Built on top of Monaco Editor, CampScholar provides a powerful code editor with syntax highlighting, code completion, for all of our supported programming languages on the platform.",
    header: <DummyCodeEditor mock />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Track Your Submissions",
    description:
      "View your recent submissions and track your progress with our submission history.",
    header: <ThreeSubmissionsCard />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Customizable",
    description:
      "Want to change the code editor theme? Maybe, use vim key bindings? No problem!",
    header: <ThemeSelector />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Bleeding Edge Tech",
    description:
      "CampScholar leverages modern .NET with a microservices architecture for modular, scalable, and high-performance applications. Each service is independently deployable, communicating via lightweight APIs.Using Docker and Kubernetes for containerization and orchestration, it ensures seamless scaling and deployment. Powered by ASP.NET Core and gRPC, CampScholar delivers optimized APIs and high-speed service communication, backed by a robust CI/CD pipeline.",
    header: <MicroserviceLogo />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Competitions for Any Use-Case",
    description:
      "Have a community contest, a classroom assignment, or a private contest with friends easily. CampScholar has you covered with our contest infrastructure for any use-case, with support for ICPC-style contests, virtual contests, and more.",
    header: <ContestCardPreview />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contest Infrastructure",
    description:
      "CampScholar comes with a powerful contest infrastructure that allows you to create and manage contests with ease.",
    header: <ContestImage />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Your Problems, Your Way",
    description:
      "Administrators on CampScholar can publish new problems written in Latex.",
    header: <ProblemPreview />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];
