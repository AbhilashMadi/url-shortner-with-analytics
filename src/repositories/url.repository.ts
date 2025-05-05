import { type IUrl, UrlModel } from "@/models/url.model.js";
import { Types } from "mongoose";

// Url Repository Interface
export interface IUrlRepository {
  createUrl(
    originalUrl: string,
    alias: string,
    expires_at?: Date,
    qr_code_path?: string,
    utm?: IUrl["utm"],
    tags?: string[]): Promise<IUrl>;
  getUrlByAlias(alias: string): Promise<IUrl | null>;
  getUrlById(id: Types.ObjectId): Promise<IUrl | null>;
  updateUrl(alias: string, data: Partial<IUrl>): Promise<IUrl | null>;
  deleteUrl(alias: string): Promise<boolean>;
}

class UrlRepository implements IUrlRepository {

  async createUrl(
    originalUrl: string,
    alias: string,
    expires_at?: Date,
    qr_code_path?: string,
    utm?: object,
    tags?: string[]
  ): Promise<IUrl> {
    const newUrl = new UrlModel({
      originalUrl,
      alias,
      created_at: new Date(),
      expires_at: expires_at || null,
      qr_code_path: qr_code_path || null,
      utm,
      tags: tags || [],
    });

    return await newUrl.save();
  }

  // Fetch a URL by its alias
  async getUrlByAlias(alias: string): Promise<IUrl | null> {
    return await UrlModel.findOne({ alias }).exec();
  }

  // Fetch a URL by its MongoDB ObjectId
  async getUrlById(id: Types.ObjectId): Promise<IUrl | null> {
    return await UrlModel.findById(id).exec();
  }

  // Update an existing URL
  async updateUrl(alias: string, data: Partial<IUrl>): Promise<IUrl | null> {
    return await UrlModel.findOneAndUpdate({ alias }, { $set: data }, { new: true }).exec();
  }

  // Delete a URL by alias
  async deleteUrl(alias: string): Promise<boolean> {
    const result = await UrlModel.deleteOne({ alias }).exec();
    return result.deletedCount > 0;
  }
}

export default new UrlRepository();
