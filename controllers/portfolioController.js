import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { connectToDatabase } from "../config/db.js";
import { projectList } from "../services/getProjects.js";

const getPortfolio = async (_, res) => {
    try {
        const pool = await connectToDatabase();
        const [rows] = await pool.execute(
            "SELECT * FROM projects ORDER BY id "
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching portfoilo:", error);
        res.status(500).json({ message: "Error fetching news" });
    }
};
const getSavedPortfolio = async (_, res) => {
    res.status(200).json(projectList);
};

export default {
    getPortfolio: ctrlWrapper(getPortfolio),
    getSavedPortfolio: ctrlWrapper(getSavedPortfolio),
};
