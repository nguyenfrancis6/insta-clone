import { collection, limit, orderBy, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useState, useEffect } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"


const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast()

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true)
      // suggest users that are not themselves and not following already
      try {
        const usersRef = collection(db, "users") 
        const q = query(
          usersRef, 
          where("uid", "not-in", [authUser.uid, ...authUser.following]), 
          orderBy("uid"), 
          limit(3)
        )

        // snapshot of query and push documents into users array
        const querySnapshot = await getDocs(q)
        const users = [];
        querySnapshot.forEach(doc => {
          users.push({...doc.data(), id: doc.id})
        })

        setSuggestedUsers(users)

      } catch (error){
        showToast("Error", error.message, "error")
      } finally {
        setIsLoading(false)
      }
    }

    if (authUser) getSuggestedUsers()
  }, [authUser])

  return { isLoading, suggestedUsers }
}

export default useGetSuggestedUsers