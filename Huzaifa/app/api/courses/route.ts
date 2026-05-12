import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        prerequisites: {
          include: {
            prerequisiteCourse: true,
          },
        },
      },
      orderBy: {
        semester: "asc",
      },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log("GET_COURSES_ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}