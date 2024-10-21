import SnippetEditForm from "@/components/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface IProps {
  params: {
    id: string;
  };
}

const EditSnippet: React.FC<IProps> = async ({ params }) => {
  if (!params.id || !isFinite(parseInt(params.id))) {
    return notFound();
  }
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) return notFound();

  return (
    <div className="flex flex-col w-full">
      <SnippetEditForm snippet={snippet} />
    </div>
  );
};

export default EditSnippet;
