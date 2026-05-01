import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import Testimonial from '@/models/Testimonial'

export async function GET() {
  await connectDB()
  const testimonials = await Testimonial.find().sort({ createdAt: -1 })
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const data = await req.json()
  const testimonial = await Testimonial.create(data)
  return NextResponse.json(testimonial, { status: 201 })
}
