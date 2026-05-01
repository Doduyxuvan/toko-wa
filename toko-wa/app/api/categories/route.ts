import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import Category from '@/models/Category'

export async function GET() {
  await connectDB()
  const categories = await Category.find().sort({ name: 1 })
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const { name } = await req.json()
  const category = await Category.create({ name })
  return NextResponse.json(category, { status: 201 })
}
