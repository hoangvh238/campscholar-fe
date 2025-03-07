import { NextRequest, NextResponse } from "next/server";

import { downloadFile } from "@/utils/minioUtils";

export async function GET(req: NextRequest) {
  try {
    const bucketName = req.nextUrl.searchParams.get("bucketName") as string;
    const objectName = req.nextUrl.searchParams.get("objectName") as string;
    if (!bucketName || !objectName) {
      return NextResponse.json(
        { error: "Missing bucket name or object name" },
        { status: 400 },
      );
    }

    const file = await downloadFile(bucketName, objectName);
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileType = objectName.split(".").pop()?.toLowerCase();
    const headers: Record<string, string> = {
      "Content-Disposition": `attachment; filename=${objectName}`,
    };
    if (fileType === "md") {
      headers["Content-Type"] = "text/markdown";
    } else if (fileType === "json") {
      headers["Content-Type"] = "application/json";
    } else if (fileType === "txt") {
      headers["Content-Type"] = "text/plain";
    } else {
      headers["Content-Type"] = "application/octet-stream";
    }
    return new Response(file, { status: 200, headers });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
