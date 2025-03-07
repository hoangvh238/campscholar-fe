"use client";

import {
  ChevronDownIcon,
  CircleIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { PinIcon } from "lucide-react";

import { Button } from "../button";
import { MagicCard } from "../problem/magic-card";
import { BorderBeam } from "../problem/magic-border";

import { cn } from "@/utils/cn";
import { Separator } from "@/components/core/common/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";

type TopicCardProps = {
  className?: string;
  topic: any;
  joinTopic?: (id: number) => void;
  mock?: boolean;
  isJoined?: boolean;
};

const desDummy =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
export function TopicCard({
  className,
  topic,
  isJoined,
  joinTopic,
  mock,
}: TopicCardProps) {
  const topicName = topic?.name;
  const topicDescription = desDummy;
  return (
    <Card className="max-w-[105%]">
      <MagicCard>
        <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
          <div className="space-y-4">
            <CardTitle className="line-clamp-2 min-h-[40px] leading-5">
              {topicName}
            </CardTitle>
            <CardDescription className="line-clamp-3 min-h-[64px]">
              {topicDescription}
            </CardDescription>
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
                  onClick={() => joinTopic && joinTopic(topic.id)}
                >
                  Join Topic
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PinIcon className="mr-2 h-4 w-4" /> Pin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className="mr-2 h-4 w-4" /> Custom
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-row items-center gap-6 text-sm text-muted-foreground">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex flex-row items-center">
                <CircleIcon className="mr-1 h-3 w-3 fill-osu text-osu" />
                <p>{topic?.numberOfProblems} Problems</p>
              </div>
              <div className="flex items-center">
                <PersonIcon className="mr-1 h-3 w-3" />
                <p>{10} Participants</p>
              </div>
              <div className="flex items-center" />
            </div>
          </div>
        </CardContent>
        {isJoined && (
          <BorderBeam
            className="m-[1/2] rounded-xl"
            delay={9}
            duration={12}
            size={250}
          />
        )}
      </MagicCard>
    </Card>
  );
}

export function TopicGrid({ topics, onJoin }: any) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {topics?.map((topic: any) => (
        <TopicCard key={topic.id} joinTopic={onJoin} topic={topic} />
      ))}
    </div>
  );
}
