interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_WS_NOTIFICATIONS_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
