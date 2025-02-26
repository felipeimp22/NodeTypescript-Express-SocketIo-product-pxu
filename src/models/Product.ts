import { Schema, model } from "mongoose";
import { productInterfaceDocument } from "../dto/product.dto";

const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    inventory: {
      type: Number,
      required: true,
      default:0,
      min: 0
    },
    images: {
      type: [String],
      default:[],
      required: false
    },
    created_at: {
      type: Date,
      default: Date.now,
      required: true
    },
    updated_at: {
      type: Date,
      default: Date.now,
      required: true
    }
  }
);

const Product = model<productInterfaceDocument>("Product", ProductSchema);

export default Product;
