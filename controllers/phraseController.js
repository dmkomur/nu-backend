import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { connectToDatabase } from "../config/db.js";

const getAllPhrases = async (_, res) => {
    try {
        const pool = await connectToDatabase();
        const [rows] = await pool.execute("SELECT * FROM phrases");
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching phrases:", error);
        res.status(500).json({ message: "Error fetching phrases" });
    }
};

export default {
    getAll: ctrlWrapper(getAllPhrases),
};
