import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

// Reusable vue composable for auth functionality
export const useAuth = () => {
  const router = useRouter()
  const auth = getAuth()
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
    router.replace('/cards-list')
  }

  return {
    signInWithGoogle,
    signOut: async () => {
      await signOut(auth)
      router.push('/login')
    },
  }
}
