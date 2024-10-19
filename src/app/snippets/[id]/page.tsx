import React from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    id: string;
  };
}

const page: React.FC<IProps> = async ({ params }) => {
  if (!params.id || !isFinite(parseInt(params.id))) {
    return notFound();
  }
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) return notFound();

  return (
    <div className="flex min-h-screen flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3>Detail Snippet</h3>
        <div className="flex space-x-3">
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>
      </div>
      <div className="mockup-code">
        <pre data-prefix="$">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default page;
