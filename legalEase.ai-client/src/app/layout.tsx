"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, createContext, useState } from "react";
import { classNames } from "./classNames";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { GetChatAPI } from "@/utils/api";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "LegalEase.ai",
  description: "The next generation Document Reviewer App",
};

export interface Doc {
  documentId: string;
  href: string;
}

export type DocContext = {
  document: Doc[];
  setDoc: (doc: string) => void;
};

export const DocumentContext = createContext<DocContext | null>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const [documents, setDocuments] = useState<Doc[]>([
    { documentId: "", href: "" },
  ]);

  useEffect(() => {
    setTimeout(() => setState(true), 2000);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("refreshToken") && pathname === "/signup") {
    } else if (!localStorage.getItem("refreshToken")) {
      navigate.push("/signin");
    }
  }, []);

  useEffect(() => {
    const GetDocs = async () => {
      if (localStorage.getItem("authId") && state) {
        const res: any = await GetChatAPI({
          authId: `${localStorage.getItem("authId")}`,
        });
        const arr: any = [];
        await res?.data.data.document.forEach((element: any) => {
          const temp = {
            documentId: element.documentId,
            href: `/documents/${element.documentId}`,
          };
          arr.push(temp);
        });
        setDocuments([...documents, ...arr]);
        console.log(...arr);
      }
    };
    GetDocs();
  }, [state]);
  const setDoc = (doc: string) => {
    const newdoc: Doc = {
      documentId: doc,
      href: `/documents/${doc}`,
    };
    setDocuments([...documents, newdoc]);
  };
  return (
    <html lang="en">
      <Provider store={store}>
        <body
          suppressHydrationWarning={true}
          className={classNames(inter.className)}
        >
          {pathname !== "/signin" ? (
            <>
              {pathname !== "/signup" ? (
                <>
                  {pathname !== "/forgot" ? (
                    <DocumentContext.Provider
                      value={{ document: documents, setDoc }}
                    >
                      <div className="flex">
                        <Sidebar
                          open={open}
                          setOpen={setOpen}
                          document={documents}
                        />
                        <div className="w-full flex flex-col">
                          <Navbar open={open} setOpen={setOpen} />
                          <div className="bg-[#00546D]">{children}</div>
                        </div>
                      </div>
                    </DocumentContext.Provider>
                  ) : (
                    <>{children}</>
                  )}
                </>
              ) : (
                <>{children}</>
              )}
            </>
          ) : (
            <>{children}</>
          )}
        </body>
      </Provider>
    </html>
  );
}
