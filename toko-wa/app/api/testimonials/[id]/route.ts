import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import Testimonial from '@/models/Testimonial'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const { id } = await params
  const data = await req.json()
  const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(testimonial)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const { id } = await params
  await Testimonial.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
