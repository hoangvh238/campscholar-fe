"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Separator } from "@/components/core/common/separator";
import UpdateClassroomForm from "@/components/modules/UpdateClassroomModule";
import ManageTopics from "@/components/modules/ClassroomDetailModule";
import Trackings from "@/components/modules/ClassroomTrackingsModule";
import { useState } from "react";

import { useGetClassroomByIdQuery } from "@/store/queries/classroom";

export default function EditClassroomPage() {
  const { classroomId } = useParams();
  const classroomIdQuery = Array.isArray(classroomId)
    ? classroomId[0]
    : classroomId;
  const [selectedTab, setSelectedTab] = useState("detail");

  const {
    data: classroomData,
    isLoading,
    refetch,
  } = useGetClassroomByIdQuery(classroomIdQuery);

  const handleClassroomUpdated = () => {
    refetch(); // Gọi API lại để lấy dữ liệu mới nhất
  };

  const classroomName = classroomData?.result?.name || "Loading...";

  return (
    <div className="flex w-full">
      {/* Sidebar Tabs */}
      <aside className="h-screen w-1/5 border-r p-6">
        <nav className="flex flex-col space-y-4">
          <TabItem
            label="Classroom Detail"
            selected={selectedTab === "detail"}
            onClick={() => setSelectedTab("detail")}
          />
          <TabItem
            label="Students Progress Tracking"
            selected={selectedTab === "tracking"}
            onClick={() => setSelectedTab("tracking")}
          />
        </nav>
      </aside>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {/* Hiển thị tên lớp học */}
            <h3 className="text-3xl font-bold">
              {isLoading ? "Loading..." : classroomName}
            </h3>
          </div>
        </div>

        <Separator />

        {/* Load Component tương ứng */}
        <div className="max-w-5xl">
          {selectedTab === "detail" ? (
            <ManageTopics
              classroomId={classroomIdQuery}
              onUpdateSuccess={handleClassroomUpdated}
            />
          ) : (
            <Trackings classroomId={classroomIdQuery} />
          )}
        </div>
      </div>
    </div>
  );
}

function TabItem({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cursor-pointer rounded-md border-2 border-transparent p-3 transition ${
        selected
          ? "border-osu font-bold text-osu"
          : "hover:border-gray-400 dark:text-white"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
