import logo from "../assets/Images/Logo.png";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "../Auth-DB/FireBase";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const tryEmail = localStorage.getItem("uid");
    if (tryEmail) {
      setSignIn(true);
    }
  }, []);

  const HandleAccount = () => {
    navigate("/account");
    setSelected("Account");
  };

  const HandleCart = () => {
    navigate("/cart");
  };

  const allLinks = [
    { name: "Home", myLink: "/" },
    { name: "Product", myLink: "/product" },
    { name: "Manual", myLink: "/manual" },
    { name: "Tutorial", myLink: "/tutorial" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 lg:w-[80%] mx-auto">
        <div className="flex items-center">
          <img
            src={logo}
            className="w-[50px] lg:w-[60px] pl-[10px] object-cover"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex text-gray-700 font-medium">
          {allLinks.map((item) => (
            <Link
              key={item.name}
              to={item.myLink}
              className="px-[30px] hover:text-blue-500 rounded-[4px]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart and Account */}
        <div className="flex items-center space-x-4">
          <button onClick={HandleCart}>
            <ShoppingCart className="w-6 h-6 text-gray-700" />
          </button>

          {signIn ? (
            <div
              onClick={HandleAccount}
              className="hidden lg:block w-[30px] h-[30px] bg-red-400 mr-[10px] rounded-full overflow-hidden cursor-pointer"
            >
              <img src={localStorage.getItem("profilePic")} />
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="hidden lg:block bg-[rgba(255,255,255,0.7)] rounded-[7px] border-[rgba(0,0,0,0.5)] border-2 mr-[10px] w-18 h-8"
            >
              SignIn
            </button>
          )}

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? (
                <X className="w-8 h-8 text-gray-700" />
              ) : (
                <Menu className="w-8 h-8 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-40 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex justify-between items-center">
            <img src={logo} className="w-[50px] object-cover" />
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-8 h-8 text-gray-700" />
            </button>
          </div>

          {allLinks.map((item) => (
            <Link
              key={item.name}
              to={item.myLink}
              className="text-gray-700 hover:text-blue-500"
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => {
              HandleCart();
              setSidebarOpen(false);
            }}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </button>

          {signIn ? (
            <div
              onClick={() => {
                HandleAccount();
                setSidebarOpen(false);
              }}
              className="w-[30px] h-[30px] bg-red-400 rounded-full overflow-hidden cursor-pointer"
            >
              <img src={localStorage.getItem("profilePic")} />
            </div>
          ) : (
            <button
              onClick={() => {
                signInWithGoogle();
                setSidebarOpen(false);
              }}
              className="bg-[rgba(255,255,255,0.7)] rounded-[7px] border-[rgba(0,0,0,0.5)] border-2 w-20 h-8"
            >
              SignIn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
