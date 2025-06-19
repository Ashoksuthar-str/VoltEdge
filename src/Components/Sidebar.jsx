import { React, useState, useEffect } from "react";
import { signInWithGoogle } from "../Auth-DB/FireBase";

function Sidebar() {
  const [signIn, setSignIn] = useState(false);
  const [selected, setSelected] = useState("Profile");

  const HandleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    window.location.reload();
  };

  useEffect(() => {
    const tryEmail = localStorage.getItem("email"); // or whatever key you are using
    if (tryEmail) {
      if (tryEmail) {
        setSignIn(true);
      }
    }
  });

  return (
    <div className="bg-white w-[300px] rounded-[10px]">
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
              selected == "Profile" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => setSelected("Profile")}
            href="#"
          >
            👤Profile
          </a>
          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(0,0,0,0.1)] ${
              selected == "Address" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => setSelected("Address")}
            href="#"
          >
            🗺️Address
          </a>

          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(0,0,0,0.1)] ${
              selected == "Orders" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => setSelected("Orders")}
            href="#"
          >
            📦Orders
          </a>

          <a
            className={`font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(0,0,0,0.2)] ${
              selected == "Setting" && "bg-[rgba(100,100,255,0.3)]"
            }`}
            onClick={() => setSelected("Setting")}
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
            className="font-bold rounded-[10px]  w-[250px] py-[15px]  hover:bg-[rgba(255,100,100,0.3)]"
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
