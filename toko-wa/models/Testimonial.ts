import mongoose, { Schema, Document } from 'mongoose'

export interface ITestimonial extends Document {
  name: string
  message: string
  image: string
  rating: number
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, default: '' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
}, { timestamps: true })

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
