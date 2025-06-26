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
        console.log(filteredData);
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
        <h1>Beginner Pack</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {products
            .filter((product) => product.difficulty == "Beginner")
            .map((item) => (
              <div
                key={item.id}
                className="bg-white min-w-[300px] max-w-[300px] m-10 rounded-md cursor-pointer shadow-[-7px_-7px_20px_rgba(0,0,0,0.6),_7px_7px_20px_rgba(255,255,255,0.3)]"
                onClick={() => navigate(`/detail/${item.code}`)}
              >
                <img className="overflow-hidden w-[300px]" src={item.img} />
                <hr />
                <h2 className="font-medium">{item.name}</h2>

                <p className="text-[rgba(0,0,0,0.6)]">{item.description}</p>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h1>Intermediate Pack</h1>
        {products
          .filter((product) => product.difficulty == "Intermediate")
          .map((item) => (
            <div>
              <img src={item.img} />
              <h2>{item.name}</h2>
              <h4>{item.price}</h4>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
      <div>
        <h1>Advanced Pack</h1>
        {products
          .filter((product) => product.difficulty == "Advanced")
          .map((item) => (
            <div>
              <img src={item.img} />
              <h2>{item.name}</h2>
              <h4>{item.price}</h4>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Product;
