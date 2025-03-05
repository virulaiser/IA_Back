import express  from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors"; // Importa cors
import "dotenv/config";
const app = express();





app.use(cors()); // Utiliza cors middleware
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ estado: "API ON" });
});

app.post("/api/gemini", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.API_KEY; // Reemplaza con tu clave de API

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        apiKey,
      {
        contents: [
          {
            parts: [{ text: message +"en 50 palabras"}],
          },
        ],
      }
    );
    res.json({ response: response.data.candidates[0].content.parts[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al conectar con Gemini." });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
