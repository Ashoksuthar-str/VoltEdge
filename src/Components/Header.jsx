import logo from "../assets/Images/Logo.png";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../Auth-DB/FireBase";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(false);

  useEffect(() => {
    const tryEmail = localStorage.getItem("email"); // or whatever key you are using
    if (tryEmail) {
      if (tryEmail) {
        setSignIn(true);
      }
    }
  });

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
          <div
            onClick={() => navigate("/account")}
            className="w-[30px] h-[30px] bg-red-400 self-center mr-[20px] lg:mr-[50px] rounded-full overflow-hidden"
          >
            <img src={localStorage.getItem("profilePic")} />
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-[rgba(255,255,255,0.7)] self-center rounded-[7px] border-[rgba(0,0,0,0.5)] border-[2px] mr-[25px] w-18 h-8"
          >
            SignIn
          </button>
        )}
      </div>
      <hr className="border-gray-500 border-1 w-[90%] mx-auto lg:w-[98%]" />
    </>
  );
}

export default Header;
