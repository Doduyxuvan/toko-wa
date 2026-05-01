import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  price: number
  description: string
  image: string
  categoryId: mongoose.Types.ObjectId | null
  featured: boolean
  createdAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
