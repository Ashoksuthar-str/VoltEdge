import React from "react";
import "../css/Home.css";
import Poster from "../assets/Poster.jpg";
import NavBar from "../Elements/NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <div className="MainContainer">
        {/* Navber */}
        <div className="Poster">
          <img className="PosterImg" src={Poster} />
          <h1>Unleash your inner Engineer</h1>
        </div>
      </div>
      <div className="Products">
        <div className="featuredProduct">
          <h2>Featured Product</h2>
        </div>
      </div>
    </>
  );
}

export default Home;
