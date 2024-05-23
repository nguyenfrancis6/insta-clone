import { useState } from "react";
import { db } from "../firebase/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import useShowToast from "./useShowToast";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    // find user in database
    setIsLoading(true)
    setUser(null)
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "User not found", "error");

      // user state is documents data
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast("Error", error.message, "error");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, getUserProfile, user, setUser }
};

export default useSearchUser;
