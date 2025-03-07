import { NextRequest, NextResponse } from "next/server";

import { deleteObject } from "@/utils/minioUtils";

export async function DELETE(req: NextRequest) {
  try {
    const bucketName = req.nextUrl.searchParams.get("bucketName") as string;
    const objectName = req.nextUrl.searchParams.get("objectName") as string;
    if (!bucketName || !objectName) {
      return NextResponse.json(
        { error: "Missing bucket name or object name" },
        { status: 400 },
      );
    }

    await deleteObject(bucketName, objectName);
    return NextResponse.json(
      { message: "Object deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
