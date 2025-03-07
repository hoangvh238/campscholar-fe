"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import { clearUser } from "@/store/slices/auth/userSlice/userSlice";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    Cookies.remove("_access_token");
    dispatch(clearUser());

    router.push("/");
  }, [dispatch, router]);
  return null;
}
