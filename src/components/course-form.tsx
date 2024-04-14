"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import slugify from "slugify";

interface Props {
  name?: string;
  slug?: string;
  update?: boolean;
}
const CourseForm = ({ name, slug, update }: Props) => {
  const [courseSlug, setCourseSlug] = useState(slug ?? "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const slug = formData.get("slug");
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify({ name, slug }),
      });
      const resData = await res.json();

      if (res.status === 201) {
        router.push(`/courses/${resData.courseId}/modules`);
        router.refresh();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full">
      {/* <form className="w-1/2 flex items-center justify-center flex-col mx-auto"> */}
      <form
        onSubmit={handleSubmit}
        className="w-[100%] mx-auto md:w-3/4 lg:w-1/3"
      >
        <label className=" mt-5 block text-gray-600" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          defaultValue={name ?? ""}
          name="name"
          onChange={(e) => {
            setCourseSlug(slugify(e.target.value, { lower: true }));
          }}
          className="border-slate-400 px-3 w-full  py-2 rounded-md border-2 "
        />

        <label className=" mt-5 block text-gray-600" htmlFor="slug">
          Slug
        </label>
        <input
          defaultValue={courseSlug}
          type="text"
          name="slug"
          className="border-slate-400 px-3 w-full  py-2 rounded-md border-2"
        />

        <button
          disabled={loading}
          className="my-5 w-full text-white py-2 rounded-md bg-blue-600 disabled:opacity-75"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>{update ? <>Update Course</> : <>Create new course</>}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
