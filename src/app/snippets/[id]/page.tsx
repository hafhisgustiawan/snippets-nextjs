import React from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as action from "@/actions";

interface IProps {
  params: {
    id: string;
  };
}

const DetailSnippet: React.FC<IProps> = async ({ params }) => {
  if (!params.id || !isFinite(parseInt(params.id))) {
    return notFound();
  }
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) return notFound();

  const deleteSnippetAction = action.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex min-h-screen flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3>Detail Snippet</h3>
        <div className="flex space-x-3">
          <Link className="btn" href={`/snippets/${params.id}/edit`}>
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button type="submit" className="btn">
              Delete
            </button>
          </form>
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

export default DetailSnippet;
