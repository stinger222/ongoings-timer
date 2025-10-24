import { auth } from "@/services/firebase"
import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth"
import { ref } from "vue"

export const useAuth = () => {
  const googleProvider = new GoogleAuthProvider()
  const user = ref<User | null>(null)

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log("Success! data: ", result)
      user.value = result.user
    } catch(error) {
      console.log("Error! data: ", error)
      user.value = null
    }
  }

  const signOut = () => {
    auth.signOut().then(() => {
      user.value = null
      console.log("Signed out successfully!")
    })
  }

  return { user, signIn, signOut } as const
}