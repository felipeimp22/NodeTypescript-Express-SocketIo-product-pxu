import { Request, Response } from "express";

class HealthCheckController {

  async healthCheck(req: Request, res: Response): Promise<Response> {
    return res.json({ message: "Api is running !!!" });
  }
}

export default new HealthCheckController();
