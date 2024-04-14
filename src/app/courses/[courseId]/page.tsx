import CourseForm from "@/components/course-form";
import prisma from "@/db/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Edit Course",
};
const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const courseData = await prisma.course.findFirst({
    where: {
      id: params.courseId,
    },
  });

  if (!courseData) {
    redirect("/");
  }
  return (
    <div>
      <div className="flex items-center justify-between gap-2 my-5">
        <Link
          href="#"
          className="bg-blue-600 text-white text-center w-full rounded-l-md px-5 py-3"
        >
          Basic Information
        </Link>
        <Link
          href={`/courses/${params.courseId}/modules`}
          className="bg-slate-300 text-center w-full px-5 py-3"
        >
          Module Information
        </Link>
        <Link
          href={`/courses/${params.courseId}/other`}
          className="bg-slate-300 text-center w-full rounded-r-md px-5 py-3"
        >
          Other Information
        </Link>
      </div>

      <h1 className="my-5 text-center text-3xl font-bold">Update Course</h1>
      <CourseForm name={courseData.name} slug={courseData.slug} update />
    </div>
  );
};

export default CoursePage;
