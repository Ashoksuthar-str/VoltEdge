import React from "react";

function Account() {
  const HandleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
  };

  return (
    <div>
      <button onClick={HandleLogOut}>LogOut</button>
    </div>
  );
}

export default Account;
