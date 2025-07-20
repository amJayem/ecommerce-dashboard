// lib/auth-server.ts
import jwt from 'jsonwebtoken'

export function verifyToken(token?: string) {
  if (!token) return null
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    return user
  } catch {
    return null
  }
}
