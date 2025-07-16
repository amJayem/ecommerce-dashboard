// src/app/dashboard/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    // if (!token) {
    //   router.replace("/login")
    // }
  }, [router])

  return <div className="p-4">Welcome to the Dashboard!</div>
}
