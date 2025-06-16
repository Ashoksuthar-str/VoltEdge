import React from "react";
import logo from "../assets/Images/Logo.png";
import { useState } from "react";

function Header() {
  const [signIn, setSignIn] = useState(false);

  const allLinks = [
    {
      name: "Home",
      myLink: "#",
    },
    {
      name: "Product",
      myLink: "#",
    },
    {
      name: "Manual",
      myLink: "#",
    },
    {
      name: "Tutorial",
      myLink: "#",
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <div className="self-center">
          <img
            src={logo}
            className="w-[50px] lg:w-[60px] pl-[10px] object-cover"
          />
        </div>
        <div className="text-white font-medium self-center flex">
          {allLinks.map((item) => (
            <a
              className="px-[7px] lg:px-[30px] hover:text-blue-500"
              href={item.myLink}
            >
              {item.name}
            </a>
          ))}
        </div>
        {signIn == true ? (
          <div className="w-[30px] h-[30px] bg-red-400 self-center mr-[20px] lg:mr-[50px] rounded-full">
            <h1 className="pl-[11px]">P</h1>
          </div>
        ) : (
          <a
            className="my-auto p-2 mr-[30px] text-white bg-gray-700 border-1 rounded-[13px]  hover:text-blue-500"
            href=""
          >
            SignIn
          </a>
        )}
      </div>
      <hr className="border-gray-500 border-1 w-[90%] mx-auto lg:w-[98%]" />
    </>
  );
}

export default Header;
