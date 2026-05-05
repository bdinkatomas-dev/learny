async function askAI() {
  const text = document.getElementById("input").value;

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await res.json();

  console.log("AI RAW:", data);

  let output = "Žádná odpověď";

  if (Array.isArray(data) && data[0]?.generated_text) {
    output = data[0].generated_text;
  } 
  else if (data?.generated_text) {
    output = data.generated_text;
  } 
  else if (data?.error) {
    output = "Error: " + data.error;
  }

  document.getElementById("out").innerText = output;
}
