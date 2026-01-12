import express, {} from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoutes from "./routes/product.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/products", ProductRoutes);
app.get("/", (req, res) => res.json({ status: "ok" }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map