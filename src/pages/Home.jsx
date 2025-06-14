import React from "react";
import "../css/Home.css";
import Poster from "../assets/Poster.jpg";

function Home() {
  return (
    <div>
      {/* Navber */}

      <div className="navbar">
        <nav>
          <div className="logo">
            <img src="" alt="logo" />
            <h3>VoltEdge</h3>
          </div>
          <div className="links">
            <a href="#">Home</a>
            <a href="#">Product</a>
            <a href="#">Manual</a>
            <a href="#">Tutorial</a>
            <a href="#">Account</a>
          </div>
        </nav>
      </div>
      <hr />
      <div className="Poster">
        <img className="PosterImg" src={Poster} />
        <h1>Unleash your inner Engineer</h1>
      </div>
      <div className="Products"></div>
    </div>
  );
}

export default Home;
