import express from "express";
import "dotenv/config";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import phrasesRouter from "./routes/phrases-route.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/phrases", phrasesRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

export default app;
