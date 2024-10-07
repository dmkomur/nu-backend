import express from "express";
import phraseController from "../controllers/phraseController.js";

const phrasesRouter = express.Router();

phrasesRouter.get("/", phraseController.getAll);

export default phrasesRouter;
