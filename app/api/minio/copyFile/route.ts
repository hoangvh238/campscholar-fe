import { NextRequest, NextResponse } from "next/server";

import { copyObject } from "@/utils/minioUtils";

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const bucketName = formData.get("bucketName") as string;
    const objectName = formData.get("objectName") as string;
    const targetBucket = formData.get("targetBucket") as string;
    const targetObject = formData.get("targetObject") as string;
    if (!bucketName || !objectName || !targetBucket || !targetObject) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    await copyObject(bucketName, objectName, targetBucket, targetObject);
    return NextResponse.json(
      { message: "Object copied successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
