import { useState } from "react";
import useAuthStore from "../store/authStore";
import { storage, db} from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { doc, updateDoc } from "firebase/firestore";


const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    //storage and user document reference
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(db, "users", authUser.uid);

    let URL = "";

    //upload image string to storage, get download url
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      // update user info and profile pic
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      // update db, local storage, state of user and profile

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
