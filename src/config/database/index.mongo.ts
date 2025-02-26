import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const options: mongoose.ConnectOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose
  .connect(
    `mongodb${process.env.ENVIRONMENT === "PRD" ? "+srv" : ""}://${
      process.env.APP_DB_USER
    }:${process.env.APP_DB_PASSWORD}@${
      process.env.ENVIRONMENT === "LOCAL"
        ? process.env.APP_DB_HOST_LOCAL
        : process.env.ENVIRONMENT === "DOCKER"
        ? process.env.APP_DB_HOST_DOCKER
        : process.env.APP_DB_HOST_PRD
    }${
      process.env.ENVIRONMENT !== "PRD" ? `:${process.env.APP_DB_PORT}` : ""
    }/${process.env.APP_DB_NAME}?authSource=admin&retryWrites=true&w=majority`,
    options
  )
  .then(
    () => {
      console.log("connection to mongoDB successfully");
    },
    (err: any) => {
      console.log("Error to connect to mongoDB: ", err);
    }
  );
