"use client";
import { Dispatch, FC, SetStateAction } from "react";
import useIsMobile from "@/app/mediaQuery";
import Profile from "@/components/profile";

interface NavbarType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar: FC<NavbarType> = ({ open, setOpen }) => {
  const width = useIsMobile();
  return (
    <>
      <div className="w-full flex items-center bg-white h-[10vh]">
        <div className="flex justify-start p-5">
          {width && (
            <div className="cursor-pointer" onClick={() => setOpen(!open)}>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="w-full gap-5 p-5 flex items-center justify-end">
          <div>
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
