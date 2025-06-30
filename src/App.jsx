import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Product from "./Pages/Product";
import Manual from "./Pages/Manual";
import Tutorial from "./Pages/Tutorial";
import ProductDetail from "./Pages/ProductDetail";
import UploadPro from "./Pages/UploadPro";
import CartPage from "./Pages/CartPage";
import Notification from "./Components/Notification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/account" element={<Account />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/uploadpro" element={<UploadPro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
