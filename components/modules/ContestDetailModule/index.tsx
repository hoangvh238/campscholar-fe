"use client";
import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  ChevronLeft,
  Share2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/core/common/button";
import { Badge } from "@/components/core/common/badge";
import Link from "next/link";
interface ContestDetail {
  id: string;
  name: String;
  startTime: string;
  endTime: string;
  status: string;
  contestAuthorId: string;
  teamSize: number;
  registrationDeadline: string;
}
import { useDownloadFileQuery } from "@/store/queries/minioStorage";
import ReactMarkdown from "react-markdown";
import { BUCKET_TYPE } from "@/settings/bucketType";
import { useGetContestByIdQuery } from "@/store/queries/contests";
import { useParams } from "next/navigation";

export default function ContestDetailModule() {
  const { id } = useParams();
  const contestId = Array.isArray(id) ? id[0] : id;

  // Gọi API lấy thông tin cuộc thi
  const {
    data: contestData,
    isLoading: isContestLoading,
    error: contestError,
  } = useGetContestByIdQuery(contestId, { skip: !contestId });

  const contest = contestData?.result || null;
  const landingPageFileName = contest?.landingPageFileName || "";

  // Gọi API MinIO lấy nội dung Markdown nếu có `landingPageFileName`
  const {
    data: markdownData,
    isLoading: isMarkdownLoading,
    error: markdownError,
  } = useDownloadFileQuery(
    {
      bucketName: BUCKET_TYPE.CONTESTS,
      objectName: landingPageFileName,
    },
    { skip: !landingPageFileName },
  );

  const [markdownContent, setMarkdownContent] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Chuyển đổi Blob thành text khi có dữ liệu từ API MinIO
  useEffect(() => {
    if (markdownData) {
      markdownData.text().then(setMarkdownContent);
    }
  }, [markdownData]);

  useEffect(() => {
    if (contest) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const start = new Date(contest.startTime).getTime();
        const distance = start - now;

        if (distance < 0) {
          clearInterval(timer);
          setTimeLeft("Contest has started!");
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [contest]);

  if (isContestLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading contest details...
      </div>
    );
  }

  if (contestError || !contest) {
    return (
      <div className="flex h-screen items-center justify-center">
        Contest not found
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = (start: string, end: string) => {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/contest"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Contests
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Sharing functionality to be implemented")}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="mb-6 rounded-lg bg-card p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{contest.name}</h1>
            </div>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Register Now
            </Button>
          </div>

          <div className="mb-4 text-2xl font-semibold text-primary">
            {contest.status === "ComingSoon"
              ? `Starts in: ${timeLeft}`
              : contest.status}
          </div>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Start Time</p>
                <p>{formatDate(contest.startTime)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">End Time</p>
                <p>{formatDate(contest.endTime)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Duration</p>
                <p>{getDuration(contest.startTime, contest.endTime)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Team Size</p>
                <p>
                  {contest.teamSize}{" "}
                  {contest.teamSize === 1 ? "person" : "people"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            {isMarkdownLoading ? (
              <p>Loading...</p>
            ) : markdownError ? (
              <p>Failed to load contest description.</p>
            ) : (
              <ReactMarkdown className="prose prose-stone max-w-full dark:prose-invert">
                {markdownContent}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
