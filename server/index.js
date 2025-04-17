import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/authRoutes.js";
import channelsRoutes from "./src/routes/channelsRoutes.js";
import settingsRoute from "./src/routes/settingsRoutes.js";
import { registerSocketServer } from "./src/io/io.js";

import Message from "./src/models/Message.js";
import User from "./src/models/User.js";
import Channel from "./src/models/Channel.js";
dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());

app.use(cors()); // connect to the server side from the different port

// for testing
app.get("/", (req, res) => {
  return res.send("hello here is your server");
});

// adding routers
app.use("/api/auth", router);
app.use("/api/channels", channelsRoutes);
app.use("/api/settings", settingsRoute);

const server = http.createServer(app);

registerSocketServer(server);
//connect to database
mongoose
  .connect(process.env.MONGO_URI) //call the url
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection is failed. Server is not started");
    console.log(err);
  });
