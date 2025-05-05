import mongoose, { Schema, Document, Types } from "mongoose";
import DeviceType from "@/utils/device-types.js";

export interface IClick extends Document {
  alias: string;                    // Alias of the shortened URL
  url_id: Types.ObjectId;           // Reference to the URL document
  timestamp: Date;
  ip: {
    ip_hash: string;                // Hashed IP for privacy
    iv: string;                     // Initialization vector for encryption
    salt: string;                   // Salt for key derivation
  };
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
  ip: {
    ip_hash: { type: String, required: true },
    iv: { type: String, required: true },
    salt: { type: String, required: true }
  },
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
}, {
  toJSON: {
    transform: (_, ret) => {
      ret.user_id = ret._id.toString();
      ret.ip = undefined;

      return ret;
    },
  }
});

export default mongoose.model<IClick>('Click', ClickSchema);
