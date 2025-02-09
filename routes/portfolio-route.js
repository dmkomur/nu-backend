import express from "express";
import portfolioController from "../controllers/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/", portfolioController.getPortfolio);

export default portfolioRouter;
