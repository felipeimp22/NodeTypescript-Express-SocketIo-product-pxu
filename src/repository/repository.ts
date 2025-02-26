  import { Document, Model } from "mongoose";
  import Product from "../models/Product";
  import User from "../models/User";
  import { Request } from "express";

  export default class Repository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
      this.model = model;
    }

    public async create(body: any): Promise<T> {
      try {
        const response = await this.model.create(body);
        return response as T;
      } catch (err) {
        const error = err as Error;
        throw new Error(`Failed to create: ${error.message}`);
      }
    }

    public async getAllWithFilters(query: any, sort: string, skip: number, limit: number) {
      return this.model.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    }

    public async getAll(skip=10, limit:number): Promise<Omit<T, keyof Document>[]> {
      try {
        const response = await this.model.find().skip(skip).limit(limit).lean();
        return response as Omit<T, keyof Document>[];
      } catch (err) {
        const error = err as Error;
        throw new Error(`Failed to get all: ${error.message}`);
      }
    }

    public async getById(id: string): Promise<Omit<T, keyof Document> | null> {
      try {
        const response = await this.model.findById(id).lean();
        return response as Omit<T, keyof Document> | null;
      } catch (err) {
        const error = err as Error;
        throw new Error(`Failed to get by ID: ${error.message}`);
      }
    }

    public async updateById(id: string, body: any): Promise<Omit<T, keyof Document> | null> {
      try {
        const response = await this.model.findByIdAndUpdate(id, body, { new: true }).lean();
        return response as Omit<T, keyof Document> | null;
      } catch (err) {
        const error = err as Error;
        throw new Error(`Failed to update: ${error.message}`);
      }
    }

    public async deleteById(id: string): Promise<Omit<T, keyof Document> | null> {
      try {
        const response = await this.model.findByIdAndDelete(id).lean();
        return response as Omit<T, keyof Document> | null;
      } catch (err) {
        const error = err as Error;
        throw new Error(`Failed to delete: ${error.message}`);
      }
    }
    
  //   public async deleteById(id: string): Promise<Omit<T, keyof Document> | null> {
  //     try {
  //         const response = await this.model.findByIdAndDelete(id);
  //         return response as Omit<T, keyof Document> | null;
  //     } catch (err) {
  //         const error = err as Error;
  //         throw new Error(`Failed to delete: ${error.message}`);
  //     }
  // }
  

    public async buyProducts(userId: string, itemsToBuy: Array<{ productId: string; quantity: number }>) {
      try {
        const user = await User.findById(userId);
        if (!user) {
          return { status: 404, error: "User not found" };
        }

        const purchasedItems = [];
        const productQuantities = new Map();

        for (const item of itemsToBuy) {
          const { productId, quantity } = item;

          if (!productId || !quantity || quantity <= 0) {
            return { status: 400, error: "Invalid product ID or quantity" };
          }

          const currentQuantity = productQuantities.get(productId) || 0;
          productQuantities.set(productId, currentQuantity + quantity);
        }
      
        for (const [productId, totalQuantity] of productQuantities) {
          const product = await Product.findById(productId);
          if (!product) {
            return { status: 404, error: `Product not found for ID: ${productId}` };
          }

          if (product.inventory < totalQuantity) {
            return { status: 400, error: `Insufficient inventory for product: ${product.title}` };
          }

          const boughtItem = {
            title: product.title,
            price: product.price,
            quantity: totalQuantity,
            date: new Date(),
          };

          purchasedItems.push(boughtItem);
        }

        for (const [productId, totalQuantity] of productQuantities) {
          const product = await Product.findById(productId);
          if (product) {
            product.inventory -= totalQuantity;
            await product.save();
          }
        }

        user.bought_items.push(...purchasedItems);
        await user.save();

        return { status: 200, purchasedItems };
      } catch (err) {
        console.error(err);
        return { status: 500, error: "Failed to purchase products" };
      }
    }

    public async uploadProductImages(productId: string, req: Request) {
      const product = await Product.findById(productId);
    
      if (!product) {
        return { status: 404, error: "Product not found" };
      }
    
      if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/temp/${req.file.filename}`;
        product.images.push(imageUrl);
      } else if (Array.isArray(req.files)) {
        const imageUrls = (req.files as Express.Multer.File[]).map(
          (file) => `${req.protocol}://${req.get("host")}/temp/${file.filename}`
        );
        product.images = product.images.concat(imageUrls);
      }
    
      await product.save();
      return { status: 200, images: product.images };
    }

  }
