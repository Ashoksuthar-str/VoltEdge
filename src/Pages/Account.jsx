import { React, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Personal from "../assets/AccountPages/Profile";
import Orders from "../assets/AccountPages/Orders";
import Address from "../assets/AccountPages/Address";
import Setting from "../assets/AccountPages/Setting";
function Account() {
  const [currPage, setCurrPage] = useState("profile");

  const renderContent = () => {
    switch (currPage) {
      case "profile":
        return <Personal />;
      case "order":
        return <Orders />;
      case "address":
        return <Address />;
      case "setting":
        return <Setting />;
      default:
        return <Personal />;
    }
  };

  const HandleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("uid");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="flex lg:not-[w-full] justify-center md:not-[justify-center] lg:w-[350px] md:m-[20px] ">
          <Sidebar setCurrPage={setCurrPage} />
        </div>
        <div className="md:my-[20px]">{renderContent()}</div>
      </div>
    </>
  );
}

export default Account;
