import logo from "../assets/Images/Logo.png";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../Auth-DB/FireBase";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(false);
  const [selected, setSelected] = useState("Home");
  const location = useLocation();
  useEffect(() => {
    const tryEmail = localStorage.getItem("email"); // or whatever key you are using
    if (tryEmail) {
      if (tryEmail) {
        setSignIn(true);
      }
    }
  });

  const HandleAccount = () => {
    navigate("/account");
    setSelected("Account");
  };

  const allLinks = [
    {
      name: "Home",
      myLink: "/",
    },
    {
      name: "Product",
      myLink: "/product",
    },
    {
      name: "Manual",
      myLink: "/manual",
    },
    {
      name: "Tutorial",
      myLink: "/tutorial",
    },
  ];
  return (
    <>
      <div className="flex justify-between lg:w-[80%] mx-auto">
        <div className="self-center">
          <img
            src={logo}
            className="w-[50px] lg:w-[60px] pl-[10px] object-cover"
          />
        </div>
        <div className="text-white font-medium self-center flex">
          {allLinks.map((item) => (
            <Link
              key={item.name}
              to={item.myLink}
              className={`px-[7px] lg:px-[30px] hover:text-blue-500 rounded-[4px] ${
                location.pathname === item.myLink &&
                "bg-[rgba(255,255,255,0.6)] border-1"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {signIn == true ? (
          <div
            onClick={HandleAccount}
            className="w-[30px] h-[30px] bg-red-400 self-center mr-[20px] lg:mr-[50px] rounded-full overflow-hidden "
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
