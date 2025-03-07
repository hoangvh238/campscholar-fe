import { NextRequest, NextResponse } from "next/server";

import { getObjectMetadata } from "@/utils/minioUtils";

export async function OPTIONS(req: NextRequest) {
  try {
    const bucketName = req.nextUrl.searchParams.get("bucketName") as string;
    const objectName = req.nextUrl.searchParams.get("objectName") as string;
    if (!bucketName || !objectName) {
      return NextResponse.json(
        { error: "Missing bucket name or object name" },
        { status: 400 },
      );
    }

    const metadata = await getObjectMetadata(bucketName, objectName);
    return NextResponse.json({ metadata }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
