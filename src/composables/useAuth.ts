import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// Reusable vue composable for auth functionality
export const useAuth = () => {
  const auth = getAuth()
  const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())

  return {
    signInWithGoogle,
    signOut: () => signOut(auth),
  }
}
