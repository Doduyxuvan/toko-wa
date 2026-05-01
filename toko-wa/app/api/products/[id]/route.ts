import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import Product from '@/models/Product'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB()
  const { id } = await params
  const product = await Product.findById(id).populate('categoryId')
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const { id } = await params
  const data = await req.json()
  const product = await Product.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(product)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const { id } = await params
  await Product.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
