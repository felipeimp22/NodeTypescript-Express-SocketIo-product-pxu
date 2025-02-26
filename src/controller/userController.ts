import { Request, Response } from "express";
import User from "../models/User";
import Repository from "../repository/repository";
import { UserInterfaceDocument } from "../dto/user.dto";

export class UserController {
  private userRepository: Repository<UserInterfaceDocument>;

  constructor() {
    this.userRepository = new Repository<UserInterfaceDocument>(User);
  }

  public async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const users = await this.userRepository.getAll(skip, limit);
      const total = await User.countDocuments();

      return res.status(200).json({
        data: users,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  public async getOne(req: Request, res: Response, me?: Boolean) {
    try {
      const userId = me ? `${req.userId}` : req.params.id;

      const user = await this.userRepository.getById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const deletedUser = await this.userRepository.deleteById(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

export default new UserController();
