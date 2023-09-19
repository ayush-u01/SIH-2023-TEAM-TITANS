"use client";

import "./FileUpload.scss";
import { useContext, useEffect, useState } from "react";
import { Comforter_Brush } from "next/font/google";
import { classNames } from "./classNames";
import { DocContext, DocumentContext } from "./layout";
import { CreateChatAPI } from "@/utils/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import FileUploader from "@/components/FileUploader";

const comfort = Comforter_Brush({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { setDoc } = useContext(DocumentContext) as DocContext;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const query = useSearchParams();
  const [pId, setpId] = useState<string>("");
  useEffect(() => {
    setpId(query?.get("pId") ?? "");
  }, [query]);

  const CustomSearch = (str: string) => {
    setSearch(str);
  };

  const SubmitHandler = async () => {
    setLoading(true);
    const res: any = await CreateChatAPI({
      pId: pId,
      authId: userInfo.authid,
      prompt: search,
    });
    setLoading(false);
    setDoc(res?.data.data.document.documentId);
    router.push(`/documents/${res?.data.data.document.documentId}`);
  };

  return (
    <>
      <div className="h-[90vh] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className={classNames(comfort.className, "text-white text-8xl")}>
            Search
          </div>
          <FileUploader
            setpId={setpId}
            pId={pId}
            authId={userInfo?.authid}
            url="https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api/pdf/create"
            fileKey="file"
          />
          <div className="flex gap-1 items-center">
            <input
              className="h-10 p-1 w-[80vw] md:w-[40vw] rounded-md focus:outline-gray-400"
              type="text"
              value={search}
              placeholder="Let your imagination run wild..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              onClick={SubmitHandler}
              className="cursor-pointer hover:bg-[#00546C] hover:text-white transition ease-in-out duration-500 h-full flex justify-center items-center w-9 rounded-md bg-white text-[#00546C]"
            >
              {!loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="w-full text-center text-white flex flex-wrap justify-center gap-5">
            <div
              className="p-2 hover:bg-white hover:text-[#00546C] transition ease-in-out duration-500 cursor-pointer border border-white rounded-md text-sm"
              onClick={() => CustomSearch("Explain the official document")}
            >
              Explain the official document
            </div>
            <div
              className="p-2 hover:bg-white hover:text-[#00546C] transition ease-in-out duration-500 cursor-pointer border border-white rounded-md text-sm"
              onClick={() => CustomSearch("Write a summary")}
            >
              Write a summary
            </div>
            <div
              className="p-2 hover:bg-white hover:text-[#00546C] transition ease-in-out duration-500 cursor-pointer border border-white rounded-md text-sm"
              onClick={() =>
                CustomSearch(
                  "Consider the document as a context, Write a letter"
                )
              }
            >
              Consider the document as a context, Write a letter
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
