import "dotenv/config";
import "./clients/db";
import express from "express";
import Boom from "boom";
import cors from "cors";
import routes from "./routes";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://twotea.onrender.com",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
  return next(Boom.notFound("This route does not exist."));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("notification", (data) => {
    // Broadcast the notification to all other connected clients
    console.log("notification received");
    socket.broadcast.emit("notification", data);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>
  console.log(
    "Server is up and running at 1:",
    `https://twotea-backend.onrender.com`
  )
);
