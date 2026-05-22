import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const studentId = Number(id);

  if (Number.isNaN(studentId)) {
    return NextResponse.json(
      { error: "Invalid student id" },
      { status: 400 }
    );
  }

  try {
    await prisma.enrollment.deleteMany({
      where: { userId: studentId },
    });

    await prisma.user.delete({
      where: { id: studentId },
    });

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Failed to delete student:", error);

    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
