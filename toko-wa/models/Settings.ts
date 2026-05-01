import mongoose, { Schema, Document } from 'mongoose'

export interface ISettings extends Document {
  siteTitle: string
  description: string
  whatsappNumber: string
  heroImage: string
  logo: string
  address: string
  operationalHours: string
}

const SettingsSchema = new Schema<ISettings>({
  siteTitle: { type: String, default: 'Toko Kita' },
  description: { type: String, default: 'Produk berkualitas terbaik untuk Anda' },
  whatsappNumber: { type: String, default: '6281234567890' },
  heroImage: { type: String, default: '' },
  logo: { type: String, default: '' },
  address: { type: String, default: 'Jakarta, Indonesia' },
  operationalHours: { type: String, default: 'Senin - Sabtu, 08.00 - 21.00 WIB' },
})

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema)
