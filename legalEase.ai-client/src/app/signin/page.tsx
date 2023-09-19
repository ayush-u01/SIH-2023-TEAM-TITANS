"use client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/userSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

const SignIn: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (token) {
      router.push("/");
    }
  }, []);
  const [isEmail, setisEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pass, setPass] = useState("");

  const LoginHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      isEmail,
      email,
      phoneNo,
      password: pass,
    };
    const navigateUser = async () => {
      await dispatch(loginUser(data));
      router.push("/");
    };
    navigateUser();
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col justify-between">
      <div className="flex flex-col justify-center items-center h-full">
        <form
          onSubmit={(e) => LoginHandler(e)}
          className="bg-gray-800 p-5 rounded-lg w-80 max-[300px]:w-64 self-center"
        >
          <div className="mb-3 text-white font-bold text-xl">Login</div>
          <hr />
          <div className="flex flex-col py-5">
            <div className="flex flex-col">
              <label className="text-white">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-md h-7 p-1"
              />
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-white">Password:</label>
              <input
                placeholder="Password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="rounded-md h-7 p-1"
              />
            </div>
            <div className="flex justify-between">
              <Link href="/signup" className="text-xs mt-2 self-end text-white">
                Don't have an account?
              </Link>
              <Link href="/forgot" className="text-xs mt-2 self-end text-white">
                Forgot Password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md self-center text-white font-bold border border-white py-2 hover:bg-white hover:text-gray-800"
          >
            Login
          </button>
        </form>
      </div>
      {/* <div className="self-end flex flex-col px-5">
        <p>Powered by</p>
        <Image width={200} src={""} alt="..." />
      </div> */}
    </div>
  );
};

export default SignIn;
