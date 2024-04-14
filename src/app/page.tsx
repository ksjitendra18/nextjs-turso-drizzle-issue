import CourseForm from "@/components/course-form";
import prisma from "@/db/prisma";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Course",
};
export default async function Home() {
  const allCourses = await prisma.course.findMany();
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="my-5 text-center text-3xl font-bold">Course Modules</h1>
        <Link
          className="rounded-md text-white bg-blue-600 px-5 py-2"
          href={`/courses/new`}
        >
          Add new Course
        </Link>
      </div>

      {allCourses.length > 0 ? (
        <div className="flex flex-col gap-5 my-5">
          {allCourses.map((course) => (
            <div
              key={module.id}
              className="flex items-center px-4 py-3 justify-between shadow-md bg-slate-100 rounded-md"
            >
              <p>{course.name}</p>
              <Link href={`/courses/${course.id}`}>Edit Course</Link>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
