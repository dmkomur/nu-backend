import express from "express";
import phraseController from "../controllers/phraseController.js";

const phrasesRouter = express.Router();

phrasesRouter.get("/", phraseController.getPhrases);

export default phrasesRouter;
