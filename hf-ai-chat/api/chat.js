export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Pouze POST" });
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.HF_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: req.body.text
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      result: data?.[0]?.generated_text || JSON.stringify(data)
    });

  } catch (err) {
    res.status(500).json({ result: "Chyba serveru: " + err.message });
  }
}
