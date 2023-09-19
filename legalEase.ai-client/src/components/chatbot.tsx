"use client";
import { classNames } from "@/app/classNames";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import logo from "../../public/AI.jpg";
import { usePathname } from "next/navigation";
import { FetchChatAPI, UpdateChatAPI } from "@/utils/api";
interface chatType {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
}

const ChatBot: FC<chatType> = ({ prompt, setPrompt }) => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<Array<string[]>>([]);
  const [docId, setDocId] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const arr: string[] = pathname.split("/");
    const FetchDocument = async () => {
      setDocId(arr[arr.length - 1]);
      const res: any = await FetchChatAPI({
        documentId: String(arr[arr.length - 1]),
      });
      const chatArr: string[][] = res?.data.data.document.chat;
      setChat(chatArr.splice(2));
    };
    FetchDocument();
    console.log(chat);
  }, [load]);

  console.log(chat);

  const ChatHandler = async () => {
    setLoading(true);
    const res: any = await UpdateChatAPI({ documentId: docId, prompt });
    const chatArr: string[][] = res?.data.data.document.chat;
    setChat(chatArr.splice(2));
    setLoading(false);
  };
  return (
    <div>
      <div className="max-[1085px]:hidden">
        <div className="bg-white w-full rounded">
          <div className="p-3 w-full font-semibold border-b border-gray-800">
            Ask me for suggestions
          </div>
          <div className="flex h-[350px] w-full flex-col">
            <div className="h-full overflow-auto p-scroll">
              <div className="flex flex-col">
                {chat.map((chats: any, index: number) => (
                  <div
                    key={index}
                    className={classNames(
                      index % 2 !== 0
                        ? "self-start bg-gray-300"
                        : "self-end flex-row-reverse",
                      "p-5 text-xs flex h-full w-full gap-2 text-black"
                    )}
                  >
                    <div className="w-7 h-7">
                      <img
                        className="w-7 h-7 rounded"
                        src={
                          index % 2 === 0
                            ? "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            : `https://landing-page-te.s3.ap-south-1.amazonaws.com/AI.jpg`
                        }
                        alt="Default avatar"
                      />
                    </div>
                    <div
                      className={classNames(
                        index % 2 === 0 ? "text-end" : "text-start",
                        "w-[220px]"
                      )}
                    >
                      {chats}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-1 py-5 h-8 items-center justify-center">
              <input
                type="text"
                placeholder="Search"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-[240px] p-1 text-xs rounded bg-gray-200 border border-gray-300"
              />
              <button
                onClick={ChatHandler}
                className="cursor-pointer h-full flex justify-center items-center w-9 rounded-md text-[#00546C]"
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
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-[1085px]:hidden">
        <div
          className="p-5 fixed right-10 text-[#00546C] bottom-10 shadow-lg bg-blue-200 rounded-full"
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </div>
        {open && (
          <div className="fixed right-10 bottom-[120px] shadow-2xl bg-white w-[300px] rounded">
            <div className="p-3 w-full font-semibold border-b border-gray-800">
              Ask me for suggestions
            </div>
            <div className="flex h-[350px] w-full flex-col">
              <div className="h-full overflow-auto p-scroll">
                <div className="flex flex-col">
                  {chat.map((chats: any, index: number) => (
                    <div
                      key={index}
                      className={classNames(
                        index % 2 !== 0
                          ? "self-start bg-gray-300"
                          : "self-end flex-row-reverse",
                        "p-5 text-xs flex h-full w-full gap-2 text-black"
                      )}
                    >
                      <div className="w-7 h-7">
                        <img
                          className="w-7 h-7 rounded"
                          src={
                            index % 2 === 0
                              ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                              : `https://landing-page-te.s3.ap-south-1.amazonaws.com/AI.jpg`
                          }
                          alt="Default avatar"
                        />
                      </div>
                      <div
                        className={classNames(
                          index % 2 === 0 ? "text-end" : "text-start",
                          "w-[220px]"
                        )}
                      >
                        {chats}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 py-5 h-8 items-center justify-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-[240px] p-1 text-xs rounded bg-gray-200 border border-gray-300"
                />
                <button
                  onClick={ChatHandler}
                  className="cursor-pointer h-full flex justify-center items-center w-9 rounded-md text-[#00546C]"
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
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
