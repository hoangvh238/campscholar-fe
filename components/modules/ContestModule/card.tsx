"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Code, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/core/common/card";

export function ContestCard({ contest }: { contest: any }) {
  const now = new Date();
  const startDate = new Date(contest.startTime);
  const endDate = new Date(contest.endTime);
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const getStatus = () => {
    if (now < startDate) return "upcoming";
    if (now >= startDate && now <= endDate) return "ongoing";
    return "finished";
  };

  const status = getStatus();

  const statusStyles = {
    upcoming: {
      bg: "bg-gradient-to-br from-python via-javascript to-java",
      accentBg: "bg-typescript",
      shadow: "shadow-skyblue",
      iconColor: "text-python",
    },
    ongoing: {
      bg: "bg-gradient-to-br from-osu via-osubrown to-java",
      accentBg: "bg-javascript",
      shadow: "shadow-osu",
      iconColor: "text-osu",
    },
    finished: {
      bg: "bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700",
      accentBg: "bg-gray-400",
      shadow: "shadow-osublack",
      iconColor: "text-gray-400",
    },
  };

  const styles = statusStyles[status];
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`flex overflow-hidden bg-white dark:bg-shadblack ${styles.shadow} group transition-all duration-300 hover:shadow-osublack`}
      >
        <motion.div
          className={`relative flex w-40 shrink-0 flex-col ${styles.bg} overflow-hidden text-white`}
          transition={{ type: "spring", stiffness: 300 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="absolute left-0 top-0 h-20 w-20 -translate-x-10 -translate-y-10 rounded-full bg-white/10" />
          <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-16 translate-y-16 rounded-full bg-white/10" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="py-3 text-center">
              <div className="text-2xl font-black tracking-wider">
                {monthNames[startDate.getMonth()]}
              </div>
            </div>

            <div className="flex flex-grow flex-col items-center justify-center px-4 py-6">
              <div className="mb-2 text-7xl font-extrabold leading-none drop-shadow-md">
                {startDate.getDate()}
              </div>
              <div className="text-lg font-semibold tracking-wider">
                {startDate
                  .toLocaleString("default", { weekday: "short" })
                  .toUpperCase()}
              </div>
            </div>

            <div
              className={`${styles.accentBg} mx-4 mb-4 flex items-center justify-center rounded-md px-3 py-2 text-center`}
            >
              <Clock className="mr-2 h-4 w-4" />
              <div className="text-sm font-bold">
                {startDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div
              className={`py-3 text-center ${status === "ongoing" ? "animate-pulse" : ""}`}
            >
              <div className="text-sm font-bold uppercase tracking-widest">
                {status}
              </div>
            </div>
          </div>
        </motion.div>

        <CardContent className="flex-1 p-6 dark:bg-shadblack">
          <div className="mb-4 overflow-hidden rounded-lg">
            <Image
              alt="Contest banner"
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              height={100}
              src={
                contest.image ||
                "https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg"
              }
              width={400}
            />
          </div>
          <h2 className="mb-3 line-clamp-1 text-2xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-osu dark:text-white">
            {contest.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {contest.description}
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Users className={`mr-2 h-5 w-5 ${styles.iconColor}`} />
              <span className="font-medium">
                {contest.participants.length}
              </span>{" "}
              &ensp; Participants
            </div>
            <div className="flex items-center">
              <Code className={`mr-2 h-5 w-5 ${styles.iconColor}`} />
              <span className="font-medium">
                {contest.problems.length}
              </span>{" "}
              &ensp; Problems
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
