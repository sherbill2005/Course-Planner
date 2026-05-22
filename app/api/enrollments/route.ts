import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(enrollments, { status: 200 });
  } catch (error) {
    console.log("GET_ENROLLMENTS_ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userId = Number(body.userId);
    const courseId = Number(body.courseId);

    if (!userId || !courseId) {
      return NextResponse.json(
        { message: "User ID and Course ID are required" },
        { status: 400 }
      );
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { message: "Already enrolled in this course" },
        { status: 409 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json(
      {
        message: "Course enrolled successfully",
        enrollment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("CREATE_ENROLLMENT_ERROR:", error);

    return NextResponse.json(
      { message: "Failed to enroll course" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const userId = Number(body.userId);
    const courseId = Number(body.courseId);

    if (!userId || !courseId) {
      return NextResponse.json(
        { message: "User ID and Course ID are required" },
        { status: 400 }
      );
    }

    await prisma.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return NextResponse.json(
      { message: "Course removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE_ENROLLMENT_ERROR:", error);

    return NextResponse.json(
      { message: "Failed to remove course" },
      { status: 500 }
    );
  }
}