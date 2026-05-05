export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        method: "POST",
        headers: {
          Authorization: "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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: req.body.text
        })
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "AI error" });
  }
}
