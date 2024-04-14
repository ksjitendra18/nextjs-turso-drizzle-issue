"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import slugify from "slugify";

interface Props {
  name?: string;
  resourceId?: string;
  update?: boolean;
  courseId: string;
  moduleId: string;
}
const ChapterForm = ({
  name,
  resourceId,
  update,
  courseId,
  moduleId,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const resourceId = formData.get("resourceId");
    try {
      const res = await fetch(`/api/courses/${courseId}/modules/${moduleId}`, {
        method: "POST",
        body: JSON.stringify({ name, resourceId }),
      });
      const resData = await res.json();

      if (res.status === 201) {
        router.push(
          `/courses/${resData.courseId}/modules/${resData.moduleId}/chapters`
        );
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
          className="border-slate-400 px-3 w-full  py-2 rounded-md border-2 "
        />

        <label className=" mt-5 block text-gray-600" htmlFor="resourceId">
          Resource Data
        </label>
        <input
          defaultValue={resourceId ?? ""}
          type="text"
          name="resourceId"
          className="border-slate-400 px-3 w-full  py-2 rounded-md border-2"
        />

        <button
          disabled={loading}
          className="my-5 w-full text-white py-2 rounded-md bg-blue-600 disabled:opacity-75"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>{update ? <>Update Chapter</> : <>Create new chapter</>}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChapterForm;
