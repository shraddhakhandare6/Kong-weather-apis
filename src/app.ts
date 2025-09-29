import express from "express";
import dotenv from "dotenv";
import forecastRoutes from "./routes/forecastRoutes";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/weatherapi/v1", forecastRoutes);

// Swagger UI at /weatherapi/v1/docs
// cast to any to satisfy express's overloaded app.use typing
app.use(
  "/weatherapi/v1/docs",
  (swaggerUi as any).serve,
  (swaggerUi as any).setup(swaggerDocument as any)
);

app.get("/", (req, res) => {
  res.send("Weather API running!");
});

export default app;
