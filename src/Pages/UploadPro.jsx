import { React, useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../Auth-DB/FireBase";
import { useNavigate } from "react-router-dom";

function UploadPro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [diff, setDiff] = useState("");
  const [image, setImg] = useState("");
  const [code, setCode] = useState(0);
  const [pass, setPass] = useState("");
  const [admin, setAdmin] = useState(false);

  const handlePassword = async () => {
    try {
      const passRef = collection(db, "myAllPass");
      const q = query(passRef, where("name", "==", "uploadpro"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        if (docData.uploadPro == pass) {
          setAdmin(true);
        } else {
          try {
            const user = localStorage.getItem("uid");
            const email = localStorage.getItem("email");
            await addDoc(collection(db, "FailedLogin"), {
              user: user,
              email: email,
            });
            alert("~~ Users Details are uploaded ~~");
          } catch (err) {
            alert(err);
            navigate("/");
          }
          navigate("/");
        }
        // You can now use docData.password or any field
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error fetching password:", error);
    }
  };

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
      {admin ? (
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
      ) : (
        <div>
          <input
            type="Password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={() => handlePassword()}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default UploadPro;
