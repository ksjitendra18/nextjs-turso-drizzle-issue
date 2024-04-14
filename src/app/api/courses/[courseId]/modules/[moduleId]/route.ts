import prisma from "@/db/prisma";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { name, resourceId } = await request.json();

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
    const moduleExists = await prisma.courseModule.findFirst({
      where: {
        id: params.moduleId,
      },
    });

    if (!moduleExists) {
      return Response.json(
        { error: "not_found", message: "Module with the id doesn't exists" },
        { status: 400 }
      );
    }

    const newChapter = await prisma.chapter.create({
      data: {
        name,
        resourceId,

        moduleId: moduleExists.id,
      },
      select: {
        id: true,
      },
    });

    return Response.json(
      {
        courseId: courseExists.id,
        moduleId: moduleExists.id,
        chapterId: newChapter.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error while creating chapter", error);
    return Response.json(
      {
        error: "server_error",
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
