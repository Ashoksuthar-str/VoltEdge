import React, { useEffect, useState } from "react";
import { db } from "../../Auth-DB/FireBase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

function Profile() {
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const userRef = doc(db, "Users", uid);
    const getUser = async () => {
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data()); // set the user data
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    if (uid) getUser();
  }, []);

  return <div className="bg-white"></div>;
}

export default Profile;
