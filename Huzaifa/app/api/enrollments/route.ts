import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function hasClash(enrollments: any[], newCourse: any) {
  for (const enrollment of enrollments) {
    for (const oldSession of enrollment.course.sessions) {
      for (const newSession of newCourse.sessions) {
        if (oldSession.day === newSession.day) {
          if (
            oldSession.startTime < newSession.endTime &&
            newSession.startTime < oldSession.endTime
          ) {
            return {
              clash: true,
              courseTitle: enrollment.course.title,
            };
          }
        }
      }
    }
  }

  return { clash: false, courseTitle: "" };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            sessions: true,
          },
        },
      },
    });

    return NextResponse.json(enrollments.map((e) => e.course));
  } catch (error) {
    console.error("Get enrollments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrolled courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = Number(body.userId);
    const courseId = body.courseId;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { sessions: true },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const alreadyEnrolled = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (alreadyEnrolled) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 409 }
      );
    }

    const currentEnrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            sessions: true,
          },
        },
      },
    });

    const clashResult = hasClash(currentEnrollments, course);

    if (clashResult.clash) {
      return NextResponse.json(
        { error: `Clash detected with ${clashResult.courseTitle}` },
        { status: 409 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: {
          include: {
            sessions: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Successfully enrolled",
      course: enrollment.course,
    });
  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json(
      { error: "Failed to enroll course" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const userId = Number(body.userId);
    const courseId = body.courseId;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 }
      );
    }

    await prisma.enrollment.deleteMany({
      where: {
        userId,
        courseId,
      },
    });

    return NextResponse.json({ message: "Course removed successfully" });
  } catch (error) {
    console.error("Remove error:", error);
    return NextResponse.json(
      { error: "Failed to remove course" },
      { status: 500 }
    );
  }
}