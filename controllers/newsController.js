import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { connectToDatabase } from "../config/db.js";
import { fetchAndSaveNews } from "../services/fetchNews.js";

const getTenNews = async (_, res) => {
    try {
        const pool = await connectToDatabase();
        const [rows] = await pool.execute(
            "SELECT * FROM news_articles ORDER BY id DESC LIMIT 10"
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching news" });
    }
};
const updateNews = async (_, res) => {
    try {
        await fetchAndSaveNews();
        res.send("got news");
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching news" });
    }
};

export default {
    getNews: ctrlWrapper(getTenNews),
    updateNews: ctrlWrapper(updateNews),
};
