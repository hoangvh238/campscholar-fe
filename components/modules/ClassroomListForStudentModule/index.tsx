"use client";
import React from "react";
import ClassDashboard from "./classComponent/class-dashboard";
import dynamic from "next/dynamic";
import { Suspense } from "react";

console.log("Trying to load remote module...");
const RemoteComponent = dynamic(() => import('viteRemote/MainEditor')
  .then((mod) => {
    console.log("Remote module loaded:", mod);
    return mod;
  })
  .catch((error) => {
    console.error("Failed to load remote module", error);
  }), { suspense: true });


function ClassroomListForStudentModule() {
  return (
    <>
      <ClassDashboard />
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteComponent />
      </Suspense>
    </>
  );
}

export default ClassroomListForStudentModule;
