import { Types } from "mongoose";
import ClickModel, { type IClick } from "@/models/click.model.js";

export interface IClickRepository {
  logClick(data: Omit<IClick, "_id" | "timestamp">): Promise<IClick>;
  getClicksByAlias(alias: string): Promise<IClick[]>;
  getClicksByUrlId(url_id: Types.ObjectId): Promise<IClick[]>;
  getClickStatsByAlias(alias: string): Promise<{
    total: number;
    unique_ips: number;
    by_country: Record<string, number>;
    by_device: Record<string, number>;
  }>;
}

class ClickRepository implements IClickRepository {
  // Log a new click
  async logClick(data: Omit<IClick, "_id" | "timestamp">): Promise<IClick> {
    const click = new ClickModel({ ...data });
    return await click.save();
  }

  // Get all clicks for a specific alias
  async getClicksByAlias(alias: string): Promise<IClick[]> {
    return await ClickModel.find({ alias }).exec();
  }

  // Get all clicks by URL document reference
  async getClicksByUrlId(url_id: Types.ObjectId): Promise<IClick[]> {
    return await ClickModel.find({ url_id }).exec();
  }

  // Aggregate stats for an alias
  async getClickStatsByAlias(alias: string) {
    const pipeline = [
      { $match: { alias } },
      {
        $facet: {
          total: [{ $count: "count" }],
          unique_ips: [
            { $group: { _id: "$ip_hash" } },
            { $count: "count" },
          ],
          by_country: [
            {
              $group: {
                _id: { $ifNull: ["$country", "Unknown"] },
                count: { $sum: 1 },
              },
            },
          ],
          by_device: [
            {
              $group: {
                _id: { $ifNull: ["$device_type", "unknown"] },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ];

    const result = await ClickModel.aggregate(pipeline).exec();
    const data = result[0];

    return {
      total: data.total[0]?.count || 0,
      unique_ips: data.uniqueIps[0]?.count || 0,
      by_country: Object.fromEntries(data.byCountry.map((c: { _id: any; count: any; }) => [c._id, c.count])),
      by_device: Object.fromEntries(data.byDevice.map((d: { _id: any; count: any; }) => [d._id, d.count])),
    };
  }
}

export default new ClickRepository();
