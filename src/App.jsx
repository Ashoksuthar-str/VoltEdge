import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Product from "./Pages/Product";
import Manual from "./Pages/Manual";
import Tutorial from "./Pages/Tutorial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
