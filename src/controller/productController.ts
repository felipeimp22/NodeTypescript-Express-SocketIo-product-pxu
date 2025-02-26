import { Request, Response } from "express";
import Product from "../models/Product";
import Repository from "../repository/repository";
import { productInterfaceDocument } from "../dto/product.dto";
import path from "path";


export class ProductController {
  private productRepository: Repository<productInterfaceDocument>;

  constructor() {
    this.productRepository = new Repository<productInterfaceDocument>(Product);
  }

  public async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const query: any = {};

      if (req.query.filter) {
        query.title = { $regex: new RegExp(req.query.filter as string, "i") };
      }

      if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) {
          query.price.$gte = parseFloat(req.query.minPrice as string);
        }
        if (req.query.maxPrice) {
          query.price.$lte = parseFloat(req.query.maxPrice as string);
        }
      }

      if (req.query.inventory) {
        if (req.query.inventory === "soldout") {
          query.inventory = 0;
        } else if (req.query.inventory === "available") {
          query.inventory = { $gt: 0 };
        }
      }

      let sort: any = {};
      if (req.query.date) {
        if (req.query.date === "newest") {
          sort.created_at = -1;
        } else if (req.query.date === "oldest") {
          sort.created_at = 1;
        }
      }

      const products = await this.productRepository.getAllWithFilters(query, sort, skip, limit);
      const total = await Product.countDocuments(query);

      const hostUrl = `${req.protocol}://${req.get("host")}`;
      const productsWithUrls = products.map((product) => ({
        ...product,
        images: product?.images?.map(
          (filename: string) => `${hostUrl}/temp/${path.basename(filename)}`
        ),
      }));

      return res.status(200).json({
        data: productsWithUrls,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const product = await this.productRepository.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const hostUrl = `${req.protocol}://${req.get("host")}`;
      product.images = product.images.map((filename: string) =>
        filename.startsWith("http") ? filename : `${hostUrl}/temp/${filename}`
      );

      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const newProduct = await this.productRepository.create(req.body);
      return res.status(201).json(newProduct);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create product" });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const deletedProduct = await this.productRepository.deleteById(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete product" });
    }
  }

  public async uploadImages(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const result = await this.productRepository.uploadProductImages(productId, req);

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(200).json({ message: "Images uploaded successfully", images: result.images });
    } catch (err) {
      res.status(500).json({ error: "Failed to upload images" });
    }
  }

  public async buyProduct(req: Request, res: Response) {
    try {
      const itemsToBuy = req.body;
      const userId = req.userId;

      if (!Array.isArray(itemsToBuy) || itemsToBuy.length === 0) {
        return res.status(400).json({ error: "Invalid request body. Expected an array of products." });
      }

      const result = await this.productRepository.buyProducts(`${userId}`, itemsToBuy);

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(200).json({ message: "Products purchased successfully", purchasedItems: result.purchasedItems });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to purchase products" });
    }
  }
}

export default new ProductController();
