import { Document } from "mongoose";

interface Product {
  title: string;
  price: number;
  inventory: number;
  images: Array<string>;
  created_at: Date;
}

export interface productInterfaceDocument extends Document, Product {}

export interface responseProductDTO extends Product {}

export interface responseProductTestDTO {
  _id: string;
  title: string;
  price: number;
  inventory: number;
  images: Array<string>;
  created_at: Date | string;
}

export interface requestBody extends Omit<Product, "created_at"> {}
