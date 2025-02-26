import { Schema, model } from "mongoose";
import { UserInterfaceDocument } from "../dto/user.dto";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bought_items: [
    {
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity:{
        type: Number,
        required: true,
        min: 1
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const User = model<UserInterfaceDocument>("User", UserSchema);

export default User;
