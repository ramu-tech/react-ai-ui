import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-functions-key": process.env.REACT_APP_FUNCTION_KEY
          },
          body: JSON.stringify({ message })
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse({ error: "Something went wrong" });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Chat App 🤖</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ padding: "10px", width: "300px" }}
      />

      <button
        onClick={sendMessage}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Send
      </button>

      {loading && <p>Thinking...</p>}

      {response && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>You:</strong> {response.userMessage}</p>
          <p><strong>AI:</strong> {response.aiReply}</p>
        </div>
      )}
    </div>
  );
}

export default App;