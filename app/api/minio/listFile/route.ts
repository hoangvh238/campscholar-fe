import { NextRequest, NextResponse } from "next/server";

import { listObjects } from "@/utils/minioUtils";

export async function GET(req: NextRequest) {
  try {
    const bucketName = req.nextUrl.searchParams.get("bucketName") as string;
    const prefix = req.nextUrl.searchParams.get("prefix") || "";
    if (!bucketName) {
      return NextResponse.json(
        { error: "Missing bucket name" },
        { status: 400 },
      );
    }

    const objects = await listObjects(bucketName, prefix);
    return NextResponse.json({ objects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
