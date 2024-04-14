import prisma from "@/db/prisma";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { name } = await request.json();

  try {
    const courseExists = await prisma.course.findFirst({
      where: {
        id: params.courseId,
      },
    });

    if (!courseExists) {
      return Response.json(
        { error: "not_found", message: "Course with the id doesn't exists" },
        { status: 400 }
      );
    }
    const newModule = await prisma.courseModule.create({
      data: {
        name,
        courseId: courseExists.id,
      },
      select: {
        id: true,
      },
    });

    return Response.json(
      { courseId: courseExists.id, moduleId: newModule.id },
      { status: 201 }
    );
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
