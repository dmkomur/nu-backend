import axios from "axios";
import { connectToDatabase } from "../config/db.js";

export async function fetchAndSaveNews() {
    try {
        const pool = await connectToDatabase();
        console.log("✅ Подключение к базе MariaDB установлено!");

        const response = await axios.get(
            "https://gnews.io/api/v4/top-headlines?country=ua&category=general&apikey=329b6f5e05a83a64f6209d0652e31c6b"
        );

        if (response.data && Array.isArray(response.data.articles)) {
            const newsData = response.data.articles;

            for (const article of newsData) {
                console.log("Добавляем статью:", article);

                try {
                    await pool.query(
                        "INSERT INTO news_articles (title, description, content, url, image, publishedAt, source_name, source_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        [
                            article.title,
                            article.description || "",
                            article.content || "",
                            article.url,
                            article.image || "",
                            article.publishedAt || "",
                            article.source.name || "",
                            article.source.url || "",
                        ]
                    );
                    console.log("got news");
                } catch (error) {
                    if (error.code === "ER_DUP_ENTRY") {
                        console.log(
                            `Новость "${article.title}" уже существует в базе данных, пропускаем.`
                        );
                    } else {
                        console.error("Ошибка при вставке новости:", error);
                    }
                }
            }
            console.log("Новости успешно обновлены в базе данных");
        } else {
            console.warn(
                "Данные не были обновлены: пустой или некорректный ответ"
            );
        }
    } catch (error) {
        console.error("Ошибка при получении новостей:", error);
    }
}
