"use client";

import ChatBot from "@/components/chatbot";
import TextEditor from "@/components/editor";
import { Popover, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { useState, Fragment } from "react";

export default function Page() {
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [prompt, setPrompt] = useState("");

  return (
    <div>
      <div className="max-[1085px]:hidden">
        <div className="m-5 min-h-[86vh] flex xl:justify-center">
          <TextEditor value={value} setValue={setValue} />

          <div className="max-[1085px]:hidden w-[15vw] ml-2 lg:ml-5 xl:ml-30">
            <div className="fixed w-[300px] flex flex-col justify-center">
              <div className="bg-white rounded">
                <div className="p-3 border-b items-center border-gray-800 flex justify-between">
                  <p className="font-semibold">Commands</p>
                  <div className="text-green-600 bg-green-300 text-[9px] p-1 rounded">
                    NEW
                  </div>
                </div>
                <div className="flex text-sm text-gray-700 flex-col">
                  <div
                    onClick={() => setPrompt("Give me a suitable heading")}
                    className="cursor-pointer p-2 hover:font-medium hover:text-black"
                  >
                    Give me a suitable heading
                  </div>
                  <div
                    onClick={() => setPrompt("Write a catchy sentence")}
                    className="cursor-pointer p-2 hover:font-medium hover:text-black"
                  >
                    Write a catchy sentence
                  </div>
                  <div
                    onClick={() => setPrompt("Give me a summary")}
                    className="cursor-pointer p-2 hover:font-medium hover:text-black"
                  >
                    Give me a summary
                  </div>
                  <div
                    onClick={() => setPrompt("Prepare an abstract")}
                    className="cursor-pointer p-2 hover:font-medium hover:text-black"
                  >
                    Prepare an abstract
                  </div>
                </div>
              </div>
              <div className="mt-24">
                <ChatBot prompt={prompt} setPrompt={setPrompt} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-[1085px]:hidden">
        <div className="m-5 min-h-[86vh] flex flex-col items-end">
          <Popover className="relative">
            <Popover.Button className="inline-flex p-3 w-full items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <div className="flex text-white items-center gap-x-3">
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </div>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -translate-x-[220px] z-10 mt-3 flex shadow-2xl">
                <div className="w-64 flex-auto overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-lg ">
                  <div className="bg-white rounded">
                    <div className="p-3 border-b items-center border-gray-800 flex justify-between">
                      <p className="font-semibold">Commands</p>
                      <div className="text-green-600 bg-green-300 text-[9px] p-1 rounded">
                        NEW
                      </div>
                    </div>
                    <div className="flex text-sm text-gray-700 flex-col">
                      <div
                        onClick={() => setPrompt("Give me a suitable heading")}
                        className="cursor-pointer p-2 hover:font-medium hover:text-black"
                      >
                        Give me a suitable heading
                      </div>
                      <div
                        onClick={() => setPrompt("Write a catchy sentence")}
                        className="cursor-pointer p-2 hover:font-medium hover:text-black"
                      >
                        Write a catchy sentence
                      </div>
                      <div
                        onClick={() => setPrompt("Give me a summary")}
                        className="cursor-pointer p-2 hover:font-medium hover:text-black"
                      >
                        Give me a summary
                      </div>
                      <div
                        onClick={() => setPrompt("Prepare an abstract")}
                        className="cursor-pointer p-2 hover:font-medium hover:text-black"
                      >
                        Prepare an abstract
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <TextEditor value={value} setValue={setValue} />
          <ChatBot prompt={prompt} setPrompt={setPrompt} />
        </div>
      </div>
    </div>
  );
}
