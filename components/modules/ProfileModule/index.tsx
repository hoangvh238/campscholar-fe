"use client";

import React, { useState, ReactNode } from "react";
import { Edit2, Save, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Avatar, AvatarImage } from "./Avatar";

import { Button } from "@/components/core/common/button";
import { Label } from "@/components/core/common/label";
import { Textarea } from "@/components/core/common/textarea";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/store/queries/usersMangement";
import { BUCKET_TYPE } from "@/settings/bucketType";
import { useDownloadFileQuery } from "@/store/queries/minioStorage/index";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "primary" }) => {
  const classes = `inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
    variant === "primary"
      ? "bg-orange-500 "
      : variant === "secondary"
        ? "bg-gray-800"
        : "border border-gray-300"
  }`;
  return <span className={classes}>{children}</span>;
};
export default function ProfileModule() {
  const [isEditing, setIsEditing] = useState(false);
  const userData = useSelector((state: any) => state.user);
  const userID = userData.userId;
  const { data, error, isLoading } = useGetUserProfileQuery({ id: userID });

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    code: "",
    avatar: "",
    bio: "",
    totalProbliemScore: 0,
    totalContestParticipated: 0,
    problemParticipationStreak: 0,
    id: "",
  });

  const [editForm, setEditForm] = useState(profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [originalAvatar, setOriginalAvatar] = useState<string | null>(null);
  React.useEffect(() => {
    if (data?.result) {
      const newProfile = {
        name: data.result.name,
        username: data.result.userName,
        code: data.result.code,
        avatar: data.result.avatarUrl || "",
        bio: data.result.bio || "",
        totalProbliemScore: data.result.totalProbliemScore,
        totalContestParticipated: data.result.totalContestParticipated,
        problemParticipationStreak: data.result.problemParticipationStreak,
        id: data.result.id,
      };
      setProfile(newProfile);
      setEditForm(newProfile);
    }
  }, [data]);

  const { data: avatarBlob, isLoading: isAvatarLoading } = useDownloadFileQuery(
    {
      bucketName: BUCKET_TYPE.AVATARS,
      objectName: selectedFileUrl ? "" : profile.avatar,
    },
    { skip: !!selectedFileUrl },
  );

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  React.useEffect(() => {
    if (avatarBlob) {
      const imageUrl = URL.createObjectURL(avatarBlob);
      setAvatarUrl(imageUrl);
    }
  }, [avatarBlob]);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const handleCancel = () => {
    setEditForm(profile);
    setSelectedFile(null);
    setSelectedFileUrl(avatarUrl);
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setSelectedFileUrl(previewUrl);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bio", editForm.bio || "");

      if (selectedFile) {
        formData.append("avatar", selectedFile, selectedFile.name);
      }

      await updateUserProfile({ userId: userID, formData }).unwrap();

      setProfile((prev) => ({
        ...prev,
        bio: editForm.bio,
        avatar: selectedFile ? URL.createObjectURL(selectedFile) : prev.avatar,
      }));

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Profile update failed. Please try again.");
    }
  };
  return (
    <div className="min-h-screen min-w-full p-6">
      <div className="mx-auto w-full rounded-lg border border-gray-300 p-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-full ${
                isEditing ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={handleAvatarClick}
            >
              <Avatar>
                {isAvatarLoading ? (
                  <p>Loading...</p>
                ) : (
                  <AvatarImage src={selectedFileUrl || avatarUrl || ""} />
                )}
              </Avatar>
              {isEditing && (
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                  type="file"
                  onChange={handleAvatarChange}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="mt-1">@{profile.code}</p>
            </div>
          </div>
          {!isEditing ? (
            <Button
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => {
                setOriginalAvatar(profile.avatar);
                setIsEditing(true);
              }}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={handleSave}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onClick={handleCancel}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="grid gap-6">
            <div className="flex gap-2">
              <Badge variant="primary">
                Total Problem Score: {profile.totalProbliemScore}{" "}
              </Badge>
              <Badge variant="outline">
                Total Contest Participated: {profile.totalContestParticipated}
              </Badge>
              <Badge variant="outline">
                Problem Participation Streak:{" "}
                {profile.problemParticipationStreak}{" "}
              </Badge>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold">Bio</h3>
              <p>{profile.bio}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold">Email</h3>
              <p>{profile.username}</p>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <Label>Bio</Label>
              <Textarea
                className="mt-3"
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
