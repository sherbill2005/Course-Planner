import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const courseId = Number(id);

  if (Number.isNaN(courseId)) {
    return NextResponse.json(
      { error: "Invalid course id" },
      { status: 400 }
    );
  }

  try {
    await prisma.enrollment.deleteMany({
      where: { courseId },
    });

    await prisma.prerequisite.deleteMany({
      where: {
        OR: [
          { courseId },
          { prerequisiteCourseId: courseId },
        ],
      },
    });

    await prisma.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Failed to delete course:", error);

    return NextResponse.json(
      { error: "Failed to delete course. Related records may still exist." },
      { status: 500 }
    );
  }
}
