"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createSnippet } from "@/actions";

const initialState = {
  isValid: false,
  errors: [],
};

const CreateSnippet = () => {
  const [formState, formAction] = useFormState(createSnippet, initialState);

  return (
    <form action={formAction}>
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
        {formState?.errors.length > 0 && (
          <div className="bg-error rounded-btn p-3">
            {formState.errors.join(" & ")}
          </div>
        )}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateSnippet;
