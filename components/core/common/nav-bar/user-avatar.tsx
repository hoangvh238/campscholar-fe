"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "../button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/core/common/dropdown-menu";
import { useDownloadFileQuery } from "@/store/queries/minioStorage";
import { BUCKET_TYPE } from "@/settings/bucketType";
import { skipToken } from "@reduxjs/toolkit/query/react";

const getInitials = (name: string | undefined) => {
  if (!name) return "U";
  const nameParts = name.split(" ");
  return nameParts
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};
export default function UserAvatar() {
  // Get user data from Redux
  const userData = useSelector((state: any) => state.user);

  const userName = userData.name || "Guest";
  const userId = userData.userId || null;
  const avatarUrl = userData.avatarUrl || null;
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const { data: fileBlob, isSuccess } = useDownloadFileQuery(
    avatarUrl
      ? { bucketName: BUCKET_TYPE.AVATARS, objectName: avatarUrl }
      : skipToken,
  );

  useEffect(() => {
    if (isSuccess && fileBlob) {
      const blobUrl = URL.createObjectURL(fileBlob);
      setAvatarSrc(blobUrl);
    }
  }, [fileBlob, isSuccess]);

  const userInitials = getInitials(userData.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="overflow-hidden rounded-full"
          size="icon"
          variant="outline"
        >
          {avatarSrc ? (
            <Image
              alt="Avatar"
              className="rounded-full"
              height={36}
              src={avatarSrc}
              width={36}
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white">
              <span className="text-lg">{userInitials}</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/profile">
          <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/logout">
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
