import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
function Account() {
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
          <Sidebar />
        </div>
        <div className="md:m-[20px]">all my info</div>
      </div>
    </>
  );
}

export default Account;
