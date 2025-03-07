"use client"

import { useParams } from "next/navigation";
import ClassDetail from "./ClassDetail/class-detail";

function ClassroomDetailForStudentModule() {
  const { id } = useParams();
  const classId = Array.isArray(id) ? id[0] : id;
  return (
    <ClassDetail
      params={{
        id: classId,
      }}
    />
  );
}

export default ClassroomDetailForStudentModule;
