import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  original_url: string;
  alias: string;
  created_at: Date;
  expires_at?: Date | null;
  qr_code_path?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  tags?: string[];
}

const urlSchema: Schema<IUrl> = new Schema<IUrl>({
  original_url: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  expires_at: {
    type: Date,
    default: null,
  },
  qr_code_path: {
    type: String,
    default: null,
  },
  utm: {
    source: { type: String },
    medium: { type: String },
    campaign: { type: String },
  },
  tags: {
    type: [String],
    default: [],
  },
});

export const UrlModel = mongoose.model<IUrl>("Url", urlSchema);
