import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'
import Settings from '@/models/Settings'

export async function GET() {
  await connectDB()
  let settings = await Settings.findOne()
  if (!settings) settings = await Settings.create({})
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  await connectDB()
  const data = await req.json()
  let settings = await Settings.findOne()
  if (!settings) {
    settings = await Settings.create(data)
  } else {
    settings = await Settings.findOneAndUpdate({}, data, { new: true })
  }
  return NextResponse.json(settings)
}
