import { NextRequest, NextResponse } from "next/server";

import { uploadFile } from "@/utils/minioUtils";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucketType = formData.get("bucketType") as string;
    const fileName = formData.get("fileName") as string;
    if (!file || !bucketType) {
      return NextResponse.json(
        { error: "Missing file or bucket type" },
        { status: 400 },
      );
    }

    const fileUrl = await uploadFile(bucketType, fileName, file);
    return NextResponse.json(
      { message: "File uploaded successfully", url: fileUrl },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
