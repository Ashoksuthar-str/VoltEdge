import React, { useEffect, useState } from "react";
import { db } from "../Auth-DB/FireBase";
import Header from "../Components/Header";
import {
  getDocs,
  getDoc,
  setDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Notification from "../Components/Notification";
import Footer from "../Components/Footer";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(false);
  const [showPro, setShowPro] = useState("All");
  const productsRef = collection(db, "Products");

  const tabs = [
    { label: "All", value: "All", count: 4 },
    { label: "Beginner", value: "Beginner", count: 2 },
    { label: "Intermediate", value: "Intermediate", count: 1 },
    { label: "Advanced", value: "Advance", count: 1 },
  ];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await getDocs(productsRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  function addToCart(code) {
    // Get existing cart from localStorage
    const cartJSON = localStorage.getItem("cart");
    let cart = cartJSON ? JSON.parse(cartJSON) : {};

    // If product exists, increase quantity
    if (cart[code]) {
      cart[code].quantity += 1;
    } else {
      // If not exists, add with quantity 1
      cart[code] = { quantity: 1 };
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    setNotification(true);
  }

  return (
    <div>
      <Header />
      {notification && <Notification close={() => setNotification(false)} />}
      <div className="w-[90%] mx-auto">
        <h1 className="text-2xl font-bold py-5 text-gray-700">
          Shop by Skill Level
        </h1>
        <div className="w-full px-4 sm:px-8 mt-4 flex justify-center">
          <div className="w-full max-w-3xl flex flex-wrap justify-between rounded-xl border border-gray-200 bg-gray-50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setShowPro(tab.value)}
                className={`relative flex-1 min-w-[100px] px-4 py-2 text-sm font-medium flex items-center justify-center gap-1 rounded-lg transition
              ${
                showPro === tab.value
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
              >
                {tab.label}
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded-full
                ${
                  showPro === tab.value
                    ? "bg-gray-100 text-black"
                    : "text-gray-400"
                }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        {(showPro == "Beginner" || showPro == "All") && (
          <div>
            <h1 className="font-bold text-gray-700 pt-8">Beginner Pack</h1>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {products
                .filter((product) => product.difficulty == "Beginner")
                .map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white min-w-[300px] max-w-[300px] m-5 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 "
                    onClick={() => navigate(`/detail/${item.code}`)}
                  >
                    <div className="relative h-[200px] overflow-hidden flex items-center justify-center bg-gray-50">
                      <img
                        className="object-contain h-full"
                        src={item.img}
                        alt={item.name}
                      />

                      {/* Difficulty Badge */}
                      <span
                        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium
      ${
        item.difficulty === "Beginner"
          ? "bg-green-100 text-green-600"
          : item.difficulty === "Intermediate"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-red-100 text-red-600"
      }
    `}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    <hr />

                    <div className="p-3">
                      <h2 className="font-semibold group-hover:text-blue-500 text-gray-800 text-lg mb-1 line-clamp-1">
                        {item.name}
                      </h2>

                      <p className="text-gray-600 text-sm clamp-2 mb-4">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <h1 className="text-blue-700 text-xl font-bold ">
                          ₹{item.price}
                        </h1>
                        <button
                          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigate on button click
                            addToCart(item.code);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {(showPro == "Intermediate" || showPro == "All") && (
          <div>
            <h1 className="font-bold text-gray-700 pt-8">Intermediate Pack</h1>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {products
                .filter((product) => product.difficulty == "Intermediate")
                .map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white min-w-[300px] max-w-[300px] m-5 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={() => navigate(`/detail/${item.code}`)}
                  >
                    <div className="relative h-[200px] overflow-hidden flex items-center justify-center bg-gray-50">
                      <img
                        className="object-contain h-full"
                        src={item.img}
                        alt={item.name}
                      />

                      {/* Difficulty Badge */}
                      <span
                        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium
      ${
        item.difficulty === "Beginner"
          ? "bg-green-100 text-green-600"
          : item.difficulty === "Intermediate"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-red-100 text-red-600"
      }
    `}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    <hr />

                    <div className="p-3">
                      <h2 className="font-semibold group-hover:text-blue-500 text-gray-800 text-lg mb-1 line-clamp-1">
                        {item.name}
                      </h2>

                      <p className="text-gray-600 text-sm clamp-2 mb-4">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <h1 className="text-blue-700 text-xl font-bold">
                          ₹{item.price}
                        </h1>
                        <button
                          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigate on button click
                            addToCart(item.code);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {(showPro == "Advance" || showPro == "All") && (
          <div>
            <h1 className="font-bold text-gray-700 pt-8">Advanced Pack</h1>
            <div className="flex overflow-x-scroll scrollbar-hide">
              {products
                .filter((product) => product.difficulty == "Advance")
                .map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white min-w-[300px] max-w-[300px] m-5 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={() => navigate(`/detail/${item.code}`)}
                  >
                    <div className="relative h-[200px] overflow-hidden flex items-center justify-center bg-gray-50">
                      <img
                        className="object-contain h-full"
                        src={item.img}
                        alt={item.name}
                      />

                      {/* Difficulty Badge */}
                      <span
                        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium
      ${
        item.difficulty === "Beginner"
          ? "bg-green-100 text-green-600"
          : item.difficulty === "Intermediate"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-red-100 text-red-600"
      }
    `}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    <hr />

                    <div className="p-3">
                      <h2 className="font-semibold group-hover:text-blue-500 text-gray-800 text-lg mb-1 line-clamp-1">
                        {item.name}
                      </h2>

                      <p className="text-gray-600 text-sm clamp-2 mb-4">
                        {item.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <h1 className="text-blue-700 text-xl font-bold">
                          ₹{item.price}
                        </h1>
                        <button
                          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigate on button click
                            addToCart(item.code);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Product;
