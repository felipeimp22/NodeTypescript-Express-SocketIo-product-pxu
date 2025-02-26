import { Document } from "mongoose";

export interface User {
    email: string;
    password: string;
    bought_items: Array<{
      title: string;
      price: number;
      quantity: number;
      date: Date;
    }>;
    created_at: Date;
    updated_at: Date;
  }
  

export interface UserInterfaceDocument extends Document, User {}

export interface responseUserDTO extends User {}

export interface responseUserTestDTO {
  _id: string;
  email: string;
  bought_items: Array<{
    product_id: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface requestBodyUser extends Omit<User, "created_at" | "updated_at"> {}
