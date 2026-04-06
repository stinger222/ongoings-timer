import { Suspense } from "react"

export default function CardsListLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
   <div>
    <Suspense fallback="loading....">
      {children}
    </Suspense>
   </div>
  )
}
