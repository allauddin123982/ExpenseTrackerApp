import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { useEffect, useState } from "react";
export const useGetTransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const transactionCollectionRef = collection(db, "transaction");
  const { userID } = useGetUserInfo();
  const getTransaction = async () => {
    let unSubscribe;
    try {
      const queryTransaction = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unSubscribe = onSnapshot(queryTransaction, (snapshot) => {
        //keep track of query if changes
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });
        setTransaction(docs);
      });
    } catch (error) {
      console.log(error.message);
    }
    return () => unSubscribe();
  };
  useEffect(() => {
    getTransaction();
  }, []);

  return { transaction };
};
