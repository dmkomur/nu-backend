import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { connectToDatabase } from "../config/db.js";

const getAllPhrases = async (_, res) => {
    try {
        const pool = await connectToDatabase();
        const [rows] = await pool.execute(
            "SELECT * FROM phrases ORDER BY RAND()"
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching phrases:", error);
        res.status(500).json({ message: "Error fetching phrases" });
    }
};

const getPhrases = async (req, res) => {
    const { theme = "", limit = 48, page = 1 } = req.query;
    let whereClause = "ORDER BY RAND()";
    if (theme !== "Все") {
        whereClause = `WHERE theme = '${theme}'`;
    }
    const offset = (page - 1) * limit;
    try {
        const pool = await connectToDatabase();

        const phrasesQuery = `SELECT * FROM phrases ${whereClause} LIMIT ${limit} OFFSET ${offset}`;
        const phrases = await pool.execute(phrasesQuery);

        const countQuery = `SELECT COUNT(*) AS total FROM phrases ${whereClause}`;
        const [[{ total }]] = await pool.execute(countQuery);

        res.json({
            phrases,
            total,
        });
    } catch (error) {
        res.status(500).json({ error: "Ошибка получения фраз" });
    }
};

export default {
    getAll: ctrlWrapper(getAllPhrases),
    getPhrases: ctrlWrapper(getPhrases),
};
