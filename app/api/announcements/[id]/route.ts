import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const announcementId = Number(id);

  if (Number.isNaN(announcementId)) {
    return NextResponse.json(
      { error: "Invalid announcement id" },
      { status: 400 }
    );
  }

  try {
    await prisma.announcement.delete({
      where: { id: announcementId },
    });

    return NextResponse.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Failed to delete announcement:", error);

    return NextResponse.json(
      { error: "Failed to delete announcement" },
      { status: 500 }
    );
  }
}
