import http from "node:http";
import { Server } from "socket.io";
import { app } from "./app.js";
import { env } from "./config/env.js";

const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: env.WEB_ORIGIN, credentials: true }
});

io.on("connection", (socket) => {
  socket.on("ride:join", (rideId: string) => socket.join(`ride:${rideId}`));
  socket.on("chat:typing", ({ rideId, userId }) => socket.to(`ride:${rideId}`).emit("chat:typing", { userId }));
  socket.on("location:update", ({ rideId, location }) => socket.to(`ride:${rideId}`).emit("location:update", location));
});

server.listen(env.API_PORT, () => {
  console.log(`RideShareX API listening on :${env.API_PORT}`);
});
