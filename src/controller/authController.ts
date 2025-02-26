import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt.util";

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        bought_items: []
      });

      const token = generateToken(`${newUser._id}`);

      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = generateToken(`${user._id}`);

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: "Failed to login" });
    }
  }

  public async getCurrentUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to get user" });
    }
  }
}

export default new AuthController();
