import prisma from "@/db/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Modules",
};
const ModulesPage = async ({ params }: { params: { courseId: string } }) => {
  const allModules = await prisma.courseModule.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  if (allModules.length < 1) {
    redirect(`/courses/${params.courseId}/modules/new`);
  }
  return (
    <main>
      <div className="flex items-center justify-between gap-2 my-5">
        <Link
          href={`/courses/${params.courseId}`}
          className="bg-green-600 text-white text-center w-full rounded-l-md px-5 py-3"
        >
          Basic Information
        </Link>
        <Link
          href={`/courses/${params.courseId}/modules`}
          className="bg-blue-600 text-white text-center w-full px-5 py-3"
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
      <div className="flex items-center gap-5">
        <h1 className="my-5 text-center text-3xl font-bold">Course Modules</h1>
        <Link
          className="rounded-md text-white bg-blue-600 px-5 py-2"
          href={`/courses/${params.courseId}/modules/new`}
        >
          Add a new Module
        </Link>
      </div>

      <div className="flex flex-col gap-5 my-5">
        {allModules.map((module) => (
          <div
            key={module.id}
            className="flex items-center px-4 py-3 justify-between shadow-md bg-slate-100 rounded-md"
          >
            <p>{module.name}</p>
            <Link
              href={`/courses/${params.courseId}/modules/${module.id}/chapters`}
            >
              View Chapters
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ModulesPage;
