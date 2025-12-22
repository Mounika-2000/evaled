import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success api" });
});

app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
