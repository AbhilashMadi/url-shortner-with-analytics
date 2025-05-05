import mongoose, { Schema, Document, Types } from "mongoose";
import DeviceType from "@/utils/device-types.js";

export interface IClick extends Document {
  alias: string;                    // Alias of the shortened URL
  url_id: Types.ObjectId;           // Reference to the URL document
  timestamp: Date;
  ip_hash: string;                  // Hashed IP for privacy
  country?: string;
  city?: string;
  region?: string;
  referrer?: string;
  user_agent?: string;
  browser?: string;
  os?: string;
  device_type?: DeviceType;
}

const ClickSchema = new Schema<IClick>({
  alias: { type: String, required: true, index: true },
  url_id: { type: Schema.Types.ObjectId, ref: 'Url', required: true },
  timestamp: { type: Date, default: Date.now },
  ip_hash: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  region: { type: String },
  referrer: { type: String },
  user_agent: { type: String },
  browser: { type: String },
  os: { type: String },
  device_type: {
    type: String,
    enum: Object.values(DeviceType),
    default: DeviceType.UNKNOWN,
  },
});

export default mongoose.model<IClick>('Click', ClickSchema);
