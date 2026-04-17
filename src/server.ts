import { Server } from "socket.io";
import { httpServer, PORT } from "./app.js";
import dotenv from "dotenv";
import { parse } from "cookie";
import { sigintShutown, sigtermShutdown } from "./utils/gracefullShutdowns.js";

dotenv.config();

const FRONT_URL = process.env.FRONTEND_URL;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production" || false;
const DEV_URL = process.env.DEV_URL || "http://localhost:3000";

const ALLOWED_ORIGINS = isProduction ? FRONT_URL : DEV_URL;

if (!FRONT_URL) {
  process.emitWarning(
    "Variável de ambiente FRONT_URL não definida.\nUtilizando DEV_URL.",
  );

  if (isProduction) {
    console.error(
      "Aplicação em produção mas variável de ambiente FRONT_URL não definida.",
    );
    process.exit(1);
  }
}

export const io = new Server(httpServer, {
  cors: {
    origin: [ALLOWED_ORIGINS!, "http://192.168.1.7:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
  },
  transports: ["websocket", "polling"], // Polling como fallback
  pingTimeout: 60000,
  pingInterval: 25000,
  connectTimeout: 45000,
  allowEIO3: true,
  perMessageDeflate: false,
  path: "/socket.io",
  cookie: {
    name: "io",
    httpOnly: true,
    sameSite: isProduction ? "lax" : "none",
  },
});

// Middleware de autenticação (se precisar)
io.use((socket, next) => {
  const cookieHeader: string | undefined = socket.handshake.headers.cookie;

  if (cookieHeader) {
    const cookies = parse(cookieHeader);
    const token = cookies.access_token;

    if (token) socket.data.access_token = token;
    next();
  } else {
    next();
  }
});

io.on("connection", (socket) => {
  console.log(
    `Cliente conectado: ${socket.id} | Transporte: ${socket.conn.transport.name}`,
  );

  void socket.join(`connection_id:${socket.id}`);

  socket.emit("connected", {
    socketId: socket.id,
    message: "Conectado ao servidor Socket.IO",
  });

  socket.on("disconnect", (reason) => {
    console.log(`Cliente ${socket.id} desconectado. Motivo: ${reason}`);
  });

  socket.on("error", (error) => {
    console.error(`Erro no socket ${socket.id}:`, error);
  });
});

// Graceful shutdowns
process.on("SIGTERM", () => sigtermShutdown(io, httpServer));
process.on("SIGINT", () => sigintShutown());

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log("-----------------------------------");
  console.log(`Frontend: ${isProduction ? FRONT_URL : DEV_URL}`);
});
