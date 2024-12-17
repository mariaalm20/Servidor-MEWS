import express from "express";
import routes from "./routes";
import { Server } from "socket.io";
import http from "http";
import net from "net";
import cors from "cors";

const app = express();
const server = http.createServer(app);
//const io = new Server(server);
app.use(cors());

app.use(routes);

//const MONITOR_IP = "192.168.0.110";
//const MONITOR_PORT = 3333;

// // Criar conexão com o monitor
// const monitorSocket = new net.Socket();
// monitorSocket.connect(MONITOR_PORT, MONITOR_IP, () => {
//   console.log(`Connected to monitor at ${MONITOR_IP}:${MONITOR_PORT}`);
// });

// monitorSocket.on("data", (data) => {
//   console.log("Message from monitor:", data.toString());
// });

// monitorSocket.on("close", () => {
//   console.log("Connection to monitor closed");
// });

// monitorSocket.on("error", (err) => {
//   console.error("Error communicating with monitor:", err);
// });

// // Configuração do Socket.IO para comunicação com clientes
// io.on("connection", (socket) => {
//   console.log("New connection:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Disconnected:", socket.id);
//   });

//   socket.on("message", (msg) => {
//     console.log("Message from client:", msg);
//     // Enviar mensagem ao monitor
//     monitorSocket.write(msg);
//   });
// });

server.listen(3333, () => {
  console.log("🚀 Server started on port 3333");
});
