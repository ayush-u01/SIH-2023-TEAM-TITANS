"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { forgotPass } from "@/utils/api";

const Forgot: NextPage = () => {
  const [email, setEmail] = useState("");
  const ForgotHandler = async (e: FormEvent) => {
    e.preventDefault();
    const res = await forgotPass({ email });
    console.log(res);
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-center items-center h-full">
        <form
          onSubmit={(e) => ForgotHandler(e)}
          className="bg-gray-800 p-5 rounded-lg w-80 max-[300px]:w-64 self-center"
        >
          <div className="mb-3 text-white font-bold text-xl">
            Forgot Password
          </div>
          <hr />
          <div className="flex flex-col py-5">
            <div className="flex flex-col">
              <label className="text-white">Email:</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-md h-7 p-1"
              />
            </div>

            <div className="text-sm mt-2 self-end text-white">
              Resend Password
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md self-center text-white font-bold border border-white py-2 hover:bg-white hover:text-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
      {/* <div className="self-end flex flex-col px-5">
        <p>Powered by</p>
        <Image width={200} src={logo} alt="..." />
      </div> */}
    </div>
  );
};

export default Forgot;
