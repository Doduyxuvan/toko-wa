import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import { signToken } from '@/lib/auth'
import Admin from '@/models/Admin'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    await connectDB()

    // Auto-seed admin default jika belum ada
    const count = await Admin.countDocuments()
    if (count === 0) {
      const hashed = await bcrypt.hash('admin123', 10)
      await Admin.create({ email: 'admin@toko.com', password: hashed })
    }

    const admin = await Admin.findOne({ email })
    if (!admin) return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 })

    const token = signToken({ id: admin._id, email: admin.email })
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' })
    return res
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
