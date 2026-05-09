import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const studentId = body.studentId?.trim();
    const password = body.password;

    if (!studentId || !password) {
      return NextResponse.json(
        { message: "Student ID and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        studentId: studentId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Student ID or Password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Student ID or Password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.fullName,
          studentId: user.studentId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("LOGIN_ERROR:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}