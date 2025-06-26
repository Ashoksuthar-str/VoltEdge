import React, { useEffect, useState } from "react";
import { db } from "../Auth-DB/FireBase";
import Header from "../Components/Header";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const productsRef = collection(db, "Products");

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

  return (
    <div>
      <Header />
      <div className="w-[90%] mx-auto">
        <h1 className="text-2xl font-bold py-5 text-gray-700">
          Shop by Skill Level
        </h1>
        <h1 className="font-bold text-gray-700">Beginner Pack</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {products
            .filter((product) => product.difficulty == "Beginner")
            .map((item) => (
              <div
                key={item.id}
                className="group bg-white min-w-[300px] max-w-[300px] m-10 rounded-md cursor-pointer shadow-[-7px_-7px_20px_rgba(0,0,0,0.6),_7px_7px_20px_rgba(255,255,255,0.3)]"
                onClick={() => navigate(`/detail/${item.code}`)}
              >
                <img className="overflow-hidden w-[300px]" src={item.img} />
                <hr />
                <div className="flex justify-between p-2">
                  <h2 className="font-medium clamp-1">{item.name}</h2>
                  <h2 className="px-2 bg-[rgba(100,255,100,0.2)] border-green-600 border-2 rounded-full">
                    {item.difficulty}
                  </h2>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added");
                  }}
                  className="absolute duration-300 opacity-0 group-hover:-translate-y-60 group-hover:opacity-100 translate-x-24.5 -translate-y-55 bg-[rgba(100,100,255,0.5)] px-3 py-2 rounded-[8px] border-2 border-blue-700"
                >
                  Add to Cart
                </button>
                <p className="clamp-2 text-[rgba(0,0,0,0.6)] px-2">
                  {item.description}
                </p>
              </div>
            ))}
        </div>

        <h1 className="font-bold text-gray-700">Intermediate Pack</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {products
            .filter((product) => product.difficulty == "Intermediate")
            .map((item) => (
              <div
                key={item.id}
                className="group bg-white min-w-[300px] max-w-[300px] m-10 rounded-md cursor-pointer shadow-[-7px_-7px_20px_rgba(0,0,0,0.6),_7px_7px_20px_rgba(255,255,255,0.3)]"
                onClick={() => navigate(`/detail/${item.code}`)}
              >
                <img className="overflow-hidden w-[300px]" src={item.img} />
                <hr />
                <div className="flex justify-between p-2">
                  <h2 className="font-medium clamp-1">{item.name}</h2>
                  <h2 className="px-2 bg-[rgba(255,255,100,0.2)] border-yellow-600 border-2 rounded-full">
                    {item.difficulty}
                  </h2>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added");
                  }}
                  className="absolute duration-300 opacity-0 group-hover:-translate-y-60 group-hover:opacity-100 translate-x-24.5 -translate-y-55 bg-[rgba(100,100,255,0.5)] px-3 py-2 rounded-[8px] border-2 border-blue-700"
                >
                  Add to Cart
                </button>
                <p className="clamp-2 text-[rgba(0,0,0,0.6)] px-2">
                  {item.description}
                </p>
              </div>
            ))}
        </div>

        <h1 className="font-bold text-gray-700">Advanced Pack</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {products
            .filter((product) => product.difficulty == "Advance")
            .map((item) => (
              <div
                key={item.id}
                className="group bg-white min-w-[300px] max-w-[300px] m-10 rounded-md cursor-pointer shadow-[-7px_-7px_20px_rgba(0,0,0,0.6),_7px_7px_20px_rgba(255,255,255,0.3)]"
                onClick={() => navigate(`/detail/${item.code}`)}
              >
                <img className="overflow-hidden w-[300px]" src={item.img} />
                <hr />
                <div className="flex justify-between p-2">
                  <h2 className="font-medium clamp-1">{item.name}</h2>
                  <h2 className="px-2 bg-[rgba(255,100,100,0.2)] border-red-600 border-2 rounded-full">
                    {item.difficulty}
                  </h2>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added");
                  }}
                  className="absolute duration-300 opacity-0 group-hover:-translate-y-60 group-hover:opacity-100 translate-x-24.5 -translate-y-55 bg-[rgba(100,100,255,0.5)] px-3 py-2 rounded-[8px] border-2 border-blue-700"
                >
                  Add to Cart
                </button>
                <p className="clamp-2 px-2 text-[rgba(0,0,0,0.6)] ">
                  {item.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
