import React, { useState } from "react";
import "./Navbar.css";

function NavBar() {
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      <header className="Container">
        <div className="logoDiv">
          <img src="" alt="logo" />
          <h3>VoltEdge</h3>
        </div>
        <div className="linkDiv">
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">Manual</a>
          <a href="#">Tutorial</a>
          {signIn == true ? (
            <a href="#">Account</a>
          ) : (
            <button className="SignBTN">SignIn</button>
          )}
        </div>
      </header>
      <hr />
    </>
  );
}

export default NavBar;
