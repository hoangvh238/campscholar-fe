"use client";
import { AnimatedGridPattern } from "@/components/core/common/problem/background";
import { Skeleton } from "@/components/core/common/skeleton";
import { BlurFade } from "@/components/core/common/topic/gellary-anm";
import { TopicCard } from "@/components/core/common/topic/topic-card";
import { useGetAllTopicsQuery } from "@/store/queries/topic";
import { cn } from "@/utils/cn";

function TopicModule() {
  const { data: topics, isLoading } = useGetAllTopicsQuery({
    pageSize: 10,
    pageIndex: 0,
  });
  return (
    <>
      <div className="mx-8 w-full max-w-7xl flex-1 flex-col space-y-4 p-8 md:flex">
        <div className="flex items-center justify-between space-y-4">
          <div className="relative flex h-[50px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
            <p className="z-10 whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter text-black dark:text-white">
              <div className="space-y-1">
                <h2 className="text-5xl font-bold tracking-tight">Topic</h2>
                <p className="text-muted-foreground">
                  Pick your interesting topic
                </p>
              </div>
            </p>

            <AnimatedGridPattern
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
              )}
              duration={3}
              maxOpacity={0.1}
              numSquares={30}
              repeatDelay={1}
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-40 w-full rounded-md" />
              ))
            : topics?.result?.items?.map((topic: any, index: number) => (
                <BlurFade key={index} inView delay={0.25 + index * 0.05}>
                  <TopicCard key={index} isJoined={false} topic={topic} />
                </BlurFade>
              ))}
        </div>
      </div>
    </>
  );
}

export default TopicModule;
