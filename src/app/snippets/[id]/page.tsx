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

  return <div>{snippet.title}</div>;
};

export default page;
