"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";
import useIsMobile from "@/app/mediaQuery";
import { classNames } from "@/app/classNames";
import { Doc } from "@/app/layout";
import { Comforter_Brush } from "next/font/google";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logout } from "@/store/userSlice";

interface SidebarType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  document: Doc[];
}
const comfort = Comforter_Brush({ weight: "400", subsets: ["latin"] });

const Sidebar: FC<SidebarType> = ({ open, setOpen, document }) => {
  const width = useIsMobile();
  const router = usePathname();

  return (
    <div>
      {width === false ? (
        <div className="w-[300px]">
          <div className="fixed p-7 bg-white h-screen w-[300px] flex flex-col justify-between">
            <div>
              <div className="pb-7">
                <div
                  className={classNames(
                    comfort.className,
                    "text-5xl text-[#00546C]"
                  )}
                >
                  Company
                </div>
              </div>
              <div className="flex flex-col">
                <Link
                  className={classNames(
                    router === "/" ? "bg-[#00546D] text-white rounded-lg" : "",
                    "p-2 flex gap-2 items-center"
                  )}
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>

                  <p>Documents</p>
                </Link>
                <Link
                  className={classNames(
                    router === "/pdf"
                      ? "bg-[#00546D] text-white rounded-lg"
                      : "",
                    "p-2 flex gap-2 items-center"
                  )}
                  href="/pdf"
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
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>

                  <p>PDFs</p>
                </Link>

                {document.map((doc: Doc, index: number) => (
                  <>
                    {index !== 0 ? (
                      <>
                        {index === 1 ? (
                          <p className="p-5 text-sm font-medium">Documents</p>
                        ) : (
                          <></>
                        )}
                        <Link
                          className={classNames(
                            router === doc.href
                              ? "bg-[#00546D] text-white rounded-lg"
                              : "",
                            "p-2 flex gap-2 items-center"
                          )}
                          href={doc.href}
                          key={index}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                            />
                          </svg>

                          <p>Documents {index}</p>
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            </div>
            <DownComponents />
          </div>
        </div>
      ) : (
        <div>
          {open ? (
            <div className="fixed z-10 h-screen p-7 w-[300px] bg-white flex flex-col justify-between">
              <div>
                <div className="pb-7 flex justify-between">
                  <div className="pb-7">
                    <div
                      className={classNames(
                        comfort.className,
                        "text-5xl text-[#00546C]"
                      )}
                    >
                      Company
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Link
                    className={classNames(
                      router === "/"
                        ? "bg-[#00546D] text-white rounded-lg"
                        : "",
                      "p-2 flex gap-2 items-center"
                    )}
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>

                    <p>Documents</p>
                  </Link>
                  {document.map((doc: Doc, index: number) => (
                    <>
                      {index !== 0 ? (
                        <>
                          {index === 1 ? (
                            <p className="p-5 text-sm font-medium">Documents</p>
                          ) : (
                            <></>
                          )}
                          <Link
                            className={classNames(
                              router === doc.href
                                ? "bg-[#00546D] text-white rounded-lg"
                                : "",
                              "p-2 flex gap-2 items-center"
                            )}
                            href={doc.href}
                            key={index}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                              />
                            </svg>

                            <p>Documents {index}</p>
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <DownComponents />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

const DownComponents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <div className="w-full flex justify-center gap-x-10">
      <Link href="/settings" className="cursor-pointer text-gray-700">
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
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </Link>
      <div
        onClick={() => {
          dispatch(logout());
          router.push("/signin");
        }}
        className="cursor-pointer text-red-600"
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
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
