import React, { useEffect, useState } from "react";
import { db } from "../Auth-DB/FireBase";
import Header from "../Components/Header";
import { getDocs, collection } from "firebase/firestore";
function Product() {
  const [products, setProducts] = useState([]);

  const productsRef = collection(db, "Products");

  useEffect(() => {
    const data = localStorage.getItem("products");
    const savedTime = localStorage.getItem("products_timestamp");
    const isOld = Date.now() - savedTime > 3600000;
    if (data && isOld == false) {
      setProducts(JSON.parse(data));
    } else {
      const getProduct = async () => {
        try {
          const data = await getDocs(productsRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          localStorage.setItem("products", JSON.stringify(filteredData));
          localStorage.setItem("products_timestamp", Date.now());
          setProducts(filteredData);
          console.log(filteredData);
        } catch (error) {
          console.log(error);
        }
      };
      getProduct();
    }
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h1>Beginner Pack</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {products
            .filter((product) => product.difficulty == "Beginner")
            .map((item) => (
              <div
                key={item.id}
                className="bg-white min-w-[300px] max-w-[300px] m-10 rounded-md"
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
