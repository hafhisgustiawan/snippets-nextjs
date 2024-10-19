import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl">Snippets</h3>
        <button className="btn">
          <Link href={"snippets/new"}>Buat Baru</Link>
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {snippets?.map((el, i) => (
          <Link
            className="border border-gray-300 rounded-lg p-3"
            key={i}
            href={`snippets/${el.id}`}
          >
            {el.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
