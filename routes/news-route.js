import express from "express";
import newsController from "../controllers/newsController.js";
const newsRouter = express.Router();

newsRouter.get("/", newsController.getNews);
newsRouter.get("/update", newsController.updateNews);

export default newsRouter;
