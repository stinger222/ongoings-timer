import { ref } from 'vue'
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  type User,
} from 'firebase/auth'
import { auth } from '@/firebase'

/**
 * @deprecated - we don't need custom solution anymore - vuefire have one built-in.
 */
export const useAuth = () => {
  const googleProvider = new GoogleAuthProvider()
  const user = ref<User | null>(null)
  const isLoading = ref<boolean>(true)

  setPersistence(auth, browserLocalPersistence)

  onAuthStateChanged(auth, (u) => {
    user.value = u
    isLoading.value = false
  })

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.success('data: ', result)
      user.value = result.user
    } catch (error) {
      console.error('data: ', error)
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      user.value = null
      console.success('Signed out!')
    } catch (error) {
      console.error('data: ', error)
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  return { user, signIn, signOut, isLoading } as const
}
