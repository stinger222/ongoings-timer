interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string,
  readonly VITE_apiKey: strng,
  readonly VITE_authDomain: strng,
  readonly VITE_projectId: strng,
  readonly VITE_storageBucket: strng,
  readonly VITE_messagingSenderId: strng,
  readonly VITE_appId: strng,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
