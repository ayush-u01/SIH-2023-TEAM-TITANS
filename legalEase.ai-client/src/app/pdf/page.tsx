"use client";

import { RootState } from "@/store/store";
import { DeleteFiles, GetAllFiles } from "@/utils/api";
import { PDFType } from "@/utils/interface";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const Page: NextPage = () => {
  const navigate = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [pdfs, setPDFs] = useState<PDFType[]>();
  const [openFile, setOpenFile] = useState("");
  const [flyout, setFlyout] = useState(false);

  useEffect(() => {
    const FileFetch = async () => {
      const response: any = await GetAllFiles({ authId: userInfo?.authid });
      setPDFs([...response?.data.data]);
    };
    FileFetch();
  }, [userInfo?.authid]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenFile("");
        setFlyout(false);
      }
    }
    if (flyout) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [flyout]);

  const DeleteHandler = async (id: string) => {
    setPDFs(pdfs?.filter((pdf: PDFType) => pdf.pId !== id));
    const response: any = await DeleteFiles({ pId: id });
    console.log(response);
  };

  const SearchHandler = (id: string) => {
    navigate.push(`/?pId=${id}`);
  };

  return (
    <div className="p-10 min-h-[90vh]">
      <div className="p-10 rounded-lg bg-white flex flex-col gap-5">
        <p className="text-2xl font-bold">Your PDFs</p>
        <div className="w-full flex flex-wrap gap-8">
          {pdfs?.map((pdf: PDFType, index: number) => (
            <div
              key={index}
              className="bg-[#00546D] text-gray-200 border border-gray-800 gap-4 cursor-pointer p-5 flex flex-col items-center hover:shadow-xl rounded-md"
            >
              <div className="flex w-full justify-between">
                <div className="flex gap-3 items-center">
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
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>

                  <p className="text-lg">
                    {pdf.link.split("/")[3].split(".")[0]}
                  </p>
                </div>
              </div>
              <div className="text-sm flex justify-between w-full items-center self-start font-semibold">
                <p>Created at: {pdf.createdAt.split("T")[0]}</p>
                <div className="relative flex flex-col">
                  <div
                    onClick={() => {
                      setFlyout(true);
                      setOpenFile(pdf.pId);
                    }}
                  >
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
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </div>
                  {flyout && openFile === pdf.pId ? (
                    <div
                      ref={popoverRef}
                      className="absolute z-10 border font-medium border-gray-800 p-3 gap-2 translate-y-7 rounded-md bg-[#00546D] flex flex-col"
                    >
                      <div
                        onClick={() => SearchHandler(pdf.pId)}
                        className="hover:font-semibold flex items-center gap-2"
                      >
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
                            d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Search
                      </div>
                      <div
                        onClick={() => navigate.push(pdf.link)}
                        className="hover:font-semibold flex items-center gap-2"
                      >
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
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        View
                      </div>
                      <div
                        onClick={() => DeleteHandler(pdf.pId)}
                        className="hover:font-semibold flex text-red-600 items-center gap-2"
                      >
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
