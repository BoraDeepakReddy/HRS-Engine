import { NextResponse } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // For prototype, we will force the first user to be admin, or just use hardcoded admin
        // Actually, we'll just let them register as "user". The hardcoded admin account can be seeded.
        role: "user",
      },
    });

    return new Response(JSON.stringify({ message: "User created successfully", userId: user.id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
