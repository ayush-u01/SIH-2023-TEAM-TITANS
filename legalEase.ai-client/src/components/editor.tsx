"use client";
import { FetchChatAPI } from "@/utils/api";
import { usePathname } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Editor from "rich-markdown-editor";

interface EditorType {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const TextEditor: FC<EditorType> = ({ value, setValue }) => {
  const [load, setLoad] = useState(false);
  const pathname = usePathname();

  const Text = (e: Function) => {
    const text = e();
    console.log(text);
  };
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const arr: string[] = pathname.split("/");
    const FetchDocument = async () => {
      const res: any = await FetchChatAPI({
        documentId: String(arr[arr.length - 1]),
      });
      setValue(res?.data.data.document.chat[1]);
    };
    FetchDocument();
    console.log(value);
  }, [load]);

  return (
    <div className="flex justify-center">
      <div className="bg-white w-full min-[1085px]:w-[40vw] p-7 rounded-md">
        <Editor onChange={(e: Function) => Text(e)} value={value} />
      </div>
    </div>
  );
};

export default TextEditor;
