import type { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "node:http";

export function sigtermShutdown(io: SocketServer, httpServer: HttpServer) {
  console.log("SIGTERM recebido, iniciando graceful shutdown...");

  io.emit("server-shutdown", {
    message: "Servidor será desligado em 5 segundos",
    timestamp: Date.now(),
  });

  setTimeout(() => {
    io.close(() => {
      console.log("Todas as conexões Socket.IO fechadas");
      httpServer.close(() => {
        console.log("Servidor HTTP fechado");
        process.exit(0);
      });
    })
      .then(() => console.log("Todas as conexões Socket.IO fechadas"))
      .catch((err) => {
        console.error("Erro ao fechar conexões Socket.IO:", err);
        process.exit(1);
      });
  }, 5000);
}

export function sigintShutown() {
  console.log("SIGINT recebido, desligando...");
  process.exit(0);
}
