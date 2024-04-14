import ModuleForm from "@/components/module-form";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "New Module",
};
export default function NewModule({
  params,
}: {
  params: { courseId: string };
}) {
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

      <h1 className="my-5 text-center text-3xl font-bold">Create new module</h1>
      <ModuleForm courseId={params.courseId} />
    </main>
  );
}
