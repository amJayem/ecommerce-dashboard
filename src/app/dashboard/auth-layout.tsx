// // src/app/dashboard/auth-layout.tsx
// import { redirect } from "next/navigation"
// import { cookies } from "next/headers"
// import { verifyToken } from "@/lib/auth-server" // we’ll make this

// export default async function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const cookieStore = cookies()
//   const token = cookieStore.get("token")?.value

//   const user = await verifyToken(token)

//   if (!user) {
//     redirect("/login")
//   }

//   return <>{children}</>
// }

"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
    }
  }, [router])

  return <>{children}</>
}
