// composables/useFirestoreFetch.ts
import { ref, onMounted, watchEffect } from 'vue'
import { getDocs, Query, QuerySnapshot, type DocumentData } from 'firebase/firestore'

export function useFirestoreFetch<T = DocumentData>(source: Query<T>) {
  const data = ref<T[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async () => {
    loading.value = true
    error.value = null
    try {
      const snapshot: QuerySnapshot<T> = await getDocs(source)
      data.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as T[]
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error')
    } finally {
      loading.value = false
    }
  }

  onMounted(fetch)

  return {
    data,
    loading,
    error,
    refresh: fetch,
  }
}
