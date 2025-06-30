import { React, useState, useEffect } from "react";
import { signInWithGoogle } from "../Auth-DB/FireBase";
import { useNavigate } from "react-router-dom";

function Sidebar({ setCurrPage }) {
  const [signIn, setSignIn] = useState(false);
  const [selected, setSelected] = useState("profile");
  const navigate = useNavigate();

  const HandleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("uid");
    navigate("/");
  };

  useEffect(() => {
    const tryEmail = localStorage.getItem("uid"); // or whatever key you are using
    if (tryEmail) {
      if (tryEmail) {
        setSignIn(true);
      }
    }
  });

  const handleTabselection = (e) => {
    setSelected(e);
    setCurrPage(e);
  };

  return (
    <div className="bg-gray-300 rounded-[10px]">
      <div className="flex justify-center py-10">
        <img
          className="rounded-full"
          src={localStorage.getItem("profilePic")}
        />
      </div>
      <hr className=" mx-auto w-[90%] border-1 border-[rgba(0,0,0,0.2)] " />

      {signIn == true ? (
        <div className="flex flex-col items-center p-10 gap-4">
          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(0,0,0,0.1)] ${
              selected == "profile" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => handleTabselection("profile")}
            href="#"
          >
            👤Profile
          </a>
          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px] hover:bg-[rgba(0,0,0,0.1)] ${
              selected == "address" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => handleTabselection("address")}
            href="#"
          >
            🗺️Address
          </a>

          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(0,0,0,0.1)] ${
              selected == "order" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => handleTabselection("order")}
            href="#"
          >
            📦Orders
          </a>

          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(0,0,0,0.2)] ${
              selected == "setting" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => handleTabselection("setting")}
            href="#"
          >
            ⚙️Setting
          </a>

          <a
            className="font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(255,100,100,0.3)]"
            href="#"
            onClick={HandleLogOut}
          >
            🚪Log-Out
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center p-20 gap-4">
          <a
            className="font-bold rounded-[10px] w-[250px] py-[15px]  hover:bg-[rgba(100,255,100,0.3)]"
            href="#"
            onClick={signInWithGoogle}
          >
            Sign-In
          </a>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Sidebar;
