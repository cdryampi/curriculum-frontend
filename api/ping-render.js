// /api/ping-render.js
import { API_BASE_URL } from "../src/config";
export default async function handler(req, res) {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
      headers: { "User-Agent": "vercel-cron-job" },
      cache: "no-store",
    });

    if (response.ok) {
      res.status(200).send("Ping exitoso: " + response.status);
    } else {
      res.status(response.status).send("Backend respondió pero con error");
    }
  } catch (err) {
    console.error("Error pinging backend:", err);
    res.status(500).send("Falló el ping al backend");
  }
}
