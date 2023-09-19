"use client";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { ChangePass } from "@/utils/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Account = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [oldpass, setOldPass] = useState<string>("");
  const [newpass, setNewPass] = useState<string>("");
  const userPic: string =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  useEffect(() => {
    setFirstName("Hardik");
    setLastName("Chhabra");
    setEmail("chhabrahardik345@gmail.com");
    setPhoneNo("+91 9953493866");
  }, []);

  const PassHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res = await ChangePass({
      authId: userInfo.authid,
      oldPassword: oldpass,
      newPassword: newpass,
    });
    console.log(res);
  };

  // const scrollToSection = (sectionId) => {
  //   const section = document.querySelector(`#${sectionId}`);
  //   section.scrollIntoView({ behavior: "smooth" });
  // };

  // const hash = window.location.hash;
  // const hashLocation = hash.substring(1);
  // const [current, setCurrent] = useState(hashLocation);

  return (
    <>
      <div className="bg-gray-100">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 font-sans xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        {/* <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 ring-1 ring-white/5">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          onClick={() => setCurrent(item.href)}
                          href={item.href}
                          className={classNames(
                            current === item.href
                              ? "bg-gray-800  text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <Link href={"/testprep"}></Link>
                </li>
              </ul>
            </nav>
          </div>
        </div> */}

        <div className="xl:pl-72">
          {" "}
          {/* <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:hidden lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div> */}
          <main className={""}>
            {/* Settings forms */}
            <div className="divide-y divide-white/5">
              <div
                id="pesonalInformation"
                className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8"
              >
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-700">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                      <img
                        src={userPic}
                        alt=""
                        className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                      />
                      <div>
                        <button
                          type="button"
                          className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-white/20"
                        >
                          Change avatar
                        </button>
                        <p className="mt-2 text-xs leading-5 text-gray-400">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 bg-black/5 px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 bg-black/5 px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 bg-black/5 px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Contact
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md bg-black/5 ring-1 ring-inset ring-black/10 focus-within:ring-2 focus-within:ring-inset ">
                          {/* <span className="flex select-none items-center pl-3 text-black sm:text-sm">
                            example.com/
                          </span> */}
                          <input
                            value={phoneNo}
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="janesmith"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-span-full">
                      <label
                        htmlFor="timezone"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Timezone
                      </label>
                      <div className="mt-2">
                        <select
                          id="timezone"
                          name="timezone"
                          className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 [&_*]:text-black"
                        >
                          <option>Pacific Standard Time</option>
                          <option>Eastern Standard Time</option>
                          <option>Greenwich Mean Time</option>
                        </select>
                      </div>
                    </div> */}
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-[#00546C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00546C]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <div
                id={"changePassword"}
                className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8"
              >
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-700">
                    Change password
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Update your password associated with your account.
                  </p>
                </div>

                <form
                  onSubmit={(e) => PassHandler(e)}
                  className="md:col-span-2"
                >
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Current password
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setOldPass(e.target.value)}
                          id="current-password"
                          name="current_password"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        New password
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setNewPass(e.target.value)}
                          id="new-password"
                          name="new_password"
                          type="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Confirm password
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setNewPass(e.target.value)}
                          id="confirm-password"
                          name="confirm_password"
                          type="password"
                          autoComplete="new-password"
                          className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-[#00546C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00546C]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              {/* <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-700">
                    Log out other sessions
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    Please enter your password to confirm you would like to log
                    out of your other sessions across all of your devices.
                  </p>
                </div>

                <form className="md:col-span-2">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="logout-password"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Your password
                      </label>
                      <div className="mt-2">
                        <input
                          id="logout-password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          className="block w-full rounded-md border-0 bg-black/5 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="rounded-md bg-[#00546C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00546C]"
                    >
                      Log out other sessions
                    </button>
                  </div>
                </form>
              </div> */}

              <div
                id={"deleteAccount"}
                className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
              >
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-700">
                    Delete account
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    No longer want to use our service? You can delete your
                    account here. This action is not reversible. All information
                    related to this account will be deleted permanently.
                  </p>
                </div>

                <form className="flex items-start md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                  >
                    Yes, delete my account
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Account;
