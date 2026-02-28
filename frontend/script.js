async function analyzeText() {
    const text = document.getElementById("userText").value;
    const button = document.querySelector("button");

    if (!text.trim()) {
        alert("Please enter some text first!");
        return;
    }

    // 🔵 Loading State
    button.disabled = true;
    button.innerText = "Analyzing...";

    try {
        const response = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        const sentimentEl = document.getElementById("sentiment");
        const emotionEl = document.getElementById("emotion");
        const replyEl = document.getElementById("reply");

        sentimentEl.innerText = data.sentiment;
        emotionEl.innerText = data.emotion;
        replyEl.innerText = data.reply;

        // 🎨 Dynamic Color Logic
        if (data.sentiment === "Positive") {
            sentimentEl.style.color = "green";
        } else if (data.sentiment === "Negative") {
            sentimentEl.style.color = "red";
        } else {
            sentimentEl.style.color = "gray";
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Backend connect nahi ho raha");
    }

    // 🔁 Reset Button
    button.disabled = false;
    button.innerText = "Analyze";
}