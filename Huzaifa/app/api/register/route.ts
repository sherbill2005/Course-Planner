import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, studentId, password } = body;

    if (!fullName || !studentId || !password) {
      return NextResponse.json(
        { message: "Full name, Student ID and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        studentId: studentId,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Student ID already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        studentId,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Student registered successfully",
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          studentId: newUser.studentId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("REGISTER_ERROR:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}