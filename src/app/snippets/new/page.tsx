import { db } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = () => {
  const createSnippet = async (data: FormData) => {
    "use server";

    const title = data.get("title") as string;
    const code = data.get("code") as string;

    const create = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log(create);
    //redirect ini khusus untuk server component
    redirect("/");
  };

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">
        <Link href={"/"}>Create a Snippet</Link>
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            id="code"
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default page;
