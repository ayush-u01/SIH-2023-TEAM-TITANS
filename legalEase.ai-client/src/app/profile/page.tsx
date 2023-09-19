"use client";
import { NextPage } from "next";

const Profile: NextPage = () => {
  const userPic: string =
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  return (
    <>
      <div className="w-full min-h-[90vh] p-8">
        <div className="bg-white p-5 rounded-lg">
          <p className="text-xl font-bold p-3">User Profile</p>
          <div className="p-3">
            <img
              src={userPic}
              alt=""
              className="h-48 w-48 flex-none rounded-lg bg-gray-800 object-cover"
            />
          </div>
          <div className="pl-3 pb-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <p className="font-semibold">First Name</p>
              <p>Hardik</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Last Name</p>
              <p>Chhabra</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Email</p>
              <p>email@gmail.com</p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Phone No.</p>
              <p>(+91) 995-349-3866</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
