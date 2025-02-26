import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";
import routes from "./routes/index.routes";
import { setupSwagger } from "./swagger";
import "./config/database/index.mongo";
import { Server as HTTPServer, createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
class Server {
  public app: express.Application;
  public httpServer: HTTPServer;
  public io: SocketIOServer;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true,
      },
    });

    this.middlewares();
    this.routes();
    this.setupSwagger();
    this.setupSockets();
    this.errorHandling();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use((req, res, next) => {
      console.log(`Received ${req.method} request on ${req.url}`);
      next();
    });

    this.app.use("/temp", express.static(path.join(__dirname, "temp")));
  }

  routes() {
    this.app.use(routes);
  }

  setupSwagger() {
    setupSwagger(this.app);
  }

  setupSockets() {
    const carts = new Map<string, any[]>();

    this.io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      const userId = socket.handshake.query.userId as string;
      if (userId) {
        socket.join(userId);
        console.log(`Socket ${socket.id} joined room: ${userId}`);
      } else {
        console.log("User ID not provided, disconnecting socket.");
        socket.disconnect();
        return;
      }

      socket.emit("cart:update", carts.get(userId) || []);

      socket.on("cart:add", (data, callback) => {
        console.log("Received cart:add event:", data);
        const { userId, item } = data;
        const cart = carts.get(userId) || [];

        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.push(item);
        }

        carts.set(userId, cart);

        console.log("Updated cart for user:", cart);

        this.io.to(userId).emit("cart:update", cart);

        console.log("Emitted cart:update event:", cart);

        if (typeof callback === "function") {
          callback("Item added successfully");
        }
      });

      socket.on("cart:updateQuantity", (data) => {
        console.log("Received cart:updateQuantity event:", data);
        const { userId, itemId, quantity } = data;
        const cart = carts.get(userId) || [];

        const updatedCart = cart.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity:
                item.quantity + quantity > 0 ? item.quantity + quantity : 1,
            };
          }
          return item;
        });

        carts.set(userId, updatedCart);

        console.log("Updated cart for user:", updatedCart);

        this.io.to(userId).emit("cart:update", updatedCart);

        console.log("Emitted cart:update event:", updatedCart);
      });

      socket.on("cart:remove", (itemId) => {
        let cart = carts.get(userId) || [];
        cart = cart.filter((item) => item.id !== itemId);
        carts.set(userId, cart);

        this.io.to(userId).emit("cart:update", cart);
        console.log(`Item removed from cart for user ${userId}:`, itemId);
      });

      socket.on("cart:get", () => {
        socket.emit("cart:update", carts.get(userId) || []);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  }

  errorHandling() {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        const error: Error = err;
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
      }
    );
  }

  listen(port: string | number) {
    this.httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default new Server();
