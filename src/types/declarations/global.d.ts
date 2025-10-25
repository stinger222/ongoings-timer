// Console tweaks
declare global {
  interface Console {
    success: typeof console.log
    fail: typeof console.log
  }
}

export {}