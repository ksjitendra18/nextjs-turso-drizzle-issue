import prisma from "@/db/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { name, slug } = await request.json();

  if (!name || !slug) {
    return Response.json(
      {
        error: "validation_error",
        message: "Missing name or slug",
      },
      { status: 400 }
    );
  }

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        slug,
      },
      select: {
        id: true,
      },
    });

    return Response.json({ courseId: newCourse.id }, { status: 201 });
  } catch (error) {
    console.log("error while creating course", error);
    return Response.json(
      {
        error: "server_error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
