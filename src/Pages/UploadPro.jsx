import { React, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Auth-DB/FireBase";

function UploadPro() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [diff, setDiff] = useState("");
  const [image, setImg] = useState("");
  const [code, setCode] = useState(0);
  const addProduct = async () => {
    try {
      await addDoc(collection(db, "Products"), {
        name: name,
        price: price,
        description: desc,
        difficulty: diff,
        img: image,
        code: code,
      });
      alert("Product is uploaded");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Product Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image Url"
        value={image}
        onChange={(e) => setImg(e.target.value)}
      />
      <input
        type="number"
        placeholder="Code"
        onChange={(e) => setCode(Number(e.target.value))}
      />
      <select value={diff} onChange={(e) => setDiff(e.target.value)}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advance">Advance</option>
      </select>
      <button onClick={addProduct}>Upload</button>
    </div>
  );
}

export default UploadPro;
