import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const studentId = body.studentId?.trim();
    const password = body.password;
    console.log("LOGIN BODY:", body);
console.log("STUDENT ID RECEIVED:", studentId);
console.log("PASSWORD RECEIVED:", password);

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
    console.log("USER FOUND:", user);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Student ID or Password" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Student ID or Password" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
  {
    id: user.id,
    studentId: user.studentId,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "1d",
  }
);

 return NextResponse.json(
  {
    message: "Login successful",
    user: {
      id: user.id,
      fullName: user.fullName,
      studentId: user.studentId,
    },
    token,
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