"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import PlatformNavbar from "../../common/nav-bar/platform-nav";
import UserAvatar from "../../common/nav-bar/user-avatar";
import { initializeUser } from "@/store/slices/auth/userSlice/userSlice";


function ContestLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);
  return (
    <main className="flex flex-col items-center justify-center overflow-x-hidden">
      <PlatformNavbar>
        <UserAvatar />
      </PlatformNavbar>
      {children}
    </main>
  );
}

export default ContestLayout;
