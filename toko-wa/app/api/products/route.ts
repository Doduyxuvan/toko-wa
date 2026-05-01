import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import Product from '@/models/Product'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')
  
  const query: Record<string, unknown> = {}
  if (category) query.categoryId = category
  if (featured === 'true') query.featured = true
  
  const products = await Product.find(query).populate('categoryId').sort({ createdAt: -1 })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const data = await req.json()
  const product = await Product.create(data)
  return NextResponse.json(product, { status: 201 })
}
