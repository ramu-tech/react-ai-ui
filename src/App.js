import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/health`, {
      headers: {
        "x-functions-key": process.env.REACT_APP_FUNCTION_KEY
      }
    })
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>React + Azure Function 🚀</h1>

      {data ? (
        <div>
          <p><strong>Status:</strong> {data.status}</p>
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Time:</strong> {data.time}</p>
        </div>
      ) : (
        <p>Loading API...</p>
      )}
    </div>
  );
}

export default App;