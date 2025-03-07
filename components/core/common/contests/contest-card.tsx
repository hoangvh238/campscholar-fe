"use client";

import {
  ChevronDownIcon,
  CircleIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Clock, EditIcon } from "lucide-react";

import { Button } from "../button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import { Separator } from "@/components/core/common/separator";
import { cn } from "@/utils/cn";

type ContestCardProps = {
  className?: string;
  contest: any;
  deleteContest?: (id: number) => void;
  mock?: boolean;
};

export function ContestCard({
  className,
  contest,
  deleteContest,
  mock,
}: ContestCardProps) {
  const contestName = contest?.title;
  const contestDescription = contest?.description;
  const startTime = contest?.startTime;
  const endTime = contest?.endTime;
  return (
    <Card className="max-w-[105%]">
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div className="space-y-4">
          <CardTitle>{contestName}</CardTitle>
          <CardDescription>{contestDescription}</CardDescription>
        </div>
        <div
          className={cn(
            "flex w-full items-center rounded-md bg-secondary text-secondary-foreground",
            {
              hidden: mock,
            },
          )}
        >
          <Separator className="h-[20px]" orientation="vertical" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="px-2 shadow-none" variant="secondary">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              forceMount
              align="end"
              alignOffset={-5}
              className="w-[200px]"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteContest && deleteContest(contest.id)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <EditIcon className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Add participant(s)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-row items-center gap-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex flex-row items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-osu text-osu" />
              <p>{contest.problems?.length} Problems</p>
            </div>
            <div className="flex items-center">
              <PersonIcon className="mr-1 h-3 w-3" />
              <p>{contest.participants?.length} Participants</p>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 size-4 md:mr-2 md:size-4" />
              <p className="w-[200%] md:w-full">0</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ContestGrid({ contests, onDelete }: any) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {contests?.map((contest: any) => (
        <ContestCard
          key={contest.id}
          contest={contest}
          deleteContest={onDelete}
        />
      ))}
    </div>
  );
}
