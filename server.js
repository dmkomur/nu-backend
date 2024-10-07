import app from "./app.js";
import "dotenv/config.js";
import { connectToDatabase } from "./config/db.js";

const { PORT = 3000, RETRY_DELAY = 5000 } = process.env;

(async () => {
    try {
        const pool = await connectToDatabase();
        await pool.query("SELECT 1");

        app.listen(PORT, () => {
            console.log(`Example app listening on port - ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    }
})();
