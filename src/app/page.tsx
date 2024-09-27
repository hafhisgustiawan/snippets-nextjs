import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div>
      {snippets?.map((el, i) => (
        <div key={i}>{el.title}</div>
      ))}
    </div>
  );
}
