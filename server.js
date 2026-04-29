const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

const API_KEY = "SEM_DEJ_SVŮJ_HF_KEY";

app.post("/api", async (req, res) => {
  const userText = req.body.text;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: userText
        })
      }
    );

    const data = await response.json();

    res.json({
      result: data?.[0]?.generated_text || JSON.stringify(data)
    });

  } catch (err) {
    res.json({ result: "Chyba serveru: " + err.message });
  }
});

app.listen(3000, () => console.log("Server běží na 3000"));
