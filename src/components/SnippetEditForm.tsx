"use client";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface IProps {
  snippet: Snippet;
}

//disini pakai camel case name karena bukan didalam app routing folder
const SnippetEditForm: React.FC<IProps> = ({ snippet }) => {
  const [code, setCode] = useState(snippet.code);
  const changeHandler = (val: string = "") => {
    setCode(val);
  };

  const updateSnippetAction = actions.updateSnippet.bind(
    null,
    snippet.id,
    code
  );

  return (
    <div className="flex flex-col py-6 space-y-3">
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={changeHandler}
      ></Editor>
      <form action={updateSnippetAction} className="flex justify-end">
        <button type="submit" className="btn w-fit uppercase btn-primary">
          save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
