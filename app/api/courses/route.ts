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
    console.error("GET_COURSES_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.courseCode || !body.instructor || !body.credits) {
      return NextResponse.json(
        { error: "Missing required course fields" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title: body.title,
        courseCode: body.courseCode,
        instructor: body.instructor,
        credits: Number(body.credits),
        semester: body.semester ? Number(body.semester) : 1,
        day: body.day || null,
        startTime: body.startTime || null,
        endTime: body.endTime || null,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("CREATE_COURSE_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}