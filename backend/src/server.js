import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

if (ENV.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "success api" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "This is the books endpoint" });
});

// Make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Any other route that user visits other than /health and /books, display the react app(index.html)
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
