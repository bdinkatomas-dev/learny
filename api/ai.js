export default async function handler(req, res) {
  const text = req.body.text;

  const models = [
    "mistralai/Mistral-7B-Instruct",
    "google/flan-t5-large"
  ];

  for (let model of models) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer TVŮJ_HF_KEY",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: text
          })
        }
      );

      const data = await response.json();

      // pokud HF vrátí error → zkus další model
      if (!data?.error) {
        return res.status(200).json(data);
      }

    } catch (e) {
      console.log("Model failed:", model);
    }
  }

  res.status(500).json({
    error: "All AI models failed"
  });
}
