import useAuthStore from "../store/authStore";
import { useEffect, useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { db } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      // ref for logged in user and other user
      const currentUserRef = doc(db, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(db, "users", userId);

      // update db
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      //update state and local storage
      const updatedAuthUser = {
        ...authUser,
        following: isFollowing
          ? authUser.following.filter((uid) => uid !== userId)
          : [...authUser.following, userId],
      };

      const updatedUserProfile = userProfile
        ? {
            ...userProfile,
            followers: isFollowing
              ? userProfile.followers.filter((uid) => uid !== authUser.uid)
              : [...userProfile.followers, authUser.uid],
          }
        : null;

      setAuthUser(updatedAuthUser);
      if (userProfile) setUserProfile(updatedUserProfile);

      localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));
      setIsFollowing(!isFollowing);
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    //isFollowing boolean based on if logged in user follows person
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
