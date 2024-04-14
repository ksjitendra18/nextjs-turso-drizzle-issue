import CourseForm from "@/components/course-form";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "New Course",
};

const NewCourse = () => {
  return (
    <div>
      <div className="flex ">
        <div>
          <Link href="#">Basic Information</Link>
        </div>
      </div>

      <h1 className="my-5 text-center text-3xl font-bold">Create new course</h1>
      <CourseForm />
    </div>
  );
};

export default NewCourse;
