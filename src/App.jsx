import "./css/Home.css";
import Poster from "./assets/Poster.png";
function App() {
  return (
    <>
      {/* Navber */}

      <div className="navbar">
        <nav>
          <div className="logo">
            <img src="" />
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
    </>
  );
}

export default App;
