import app from "./app.js";
import "dotenv/config.js";
import { connectToDatabase } from "./config/db.js";
import { fetchAndSaveNews } from "./services/fetchNews.js";

const { PORT = 3000 } = process.env;

(async () => {
    try {
        const pool = await connectToDatabase();
        await pool.query("SELECT 1");

        setInterval(fetchAndSaveNews, 10800000);

        app.listen(PORT, () => {
            console.log(`Example app listening on port - ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
})();
