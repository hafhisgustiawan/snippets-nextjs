"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { object, string } from "yup";

const manageSnippetValidationSchema = object({
  title: string()
    .required("Kolom title tidak boleh kosong")
    .min(3, "Minimal 3 karakter"),
  code: string().required("Kolom code tidak boleh kosong"),
});

export const updateSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect("/");
};

export const createSnippet = async (
  formState: {
    isValid: boolean;
    errors: string[];
  },
  formData: FormData
) => {
  const { title, code } = Object.fromEntries(formData);
  try {
    await manageSnippetValidationSchema.validate({
      title: title.toString(),
      code: code.toString(),
    });
  } catch (e) {
    const err = e as {
      errors: string[];
    };
    return { isValid: false, errors: err.errors };
  }

  await db.snippet.create({
    data: {
      title: title.toString(),
      code: code.toString(),
    },
  });

  // console.log(create);
  // redirect ini khusus untuk server component
  // jangan masukkan redirect ini ke try catch block, dia akan dibaca sebagai error NEXT_REDIRECT
  revalidatePath("/");
  redirect("/");
};
