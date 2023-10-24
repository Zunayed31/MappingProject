import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start: startInput,
                                end: endInput,   
         }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      saveToFile(data.result, 'directions.txt');+
      setResult(data.result);
      console.log(result);
      setStartInput("");
      setEndInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
    // Function to save content to a text file
    function saveToFile(content, filename) {
      content = content.trimStart();
      const blob = new Blob([content], { type: 'text/plain' });
  
      const reader = new FileReader();
      reader.onload = function () {
        const a = document.createElement('a');
        a.href = reader.result;
        a.download = filename;
        a.click();
      };
  
      reader.readAsDataURL(blob);
    }
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Enter the directions</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="start"
            placeholder="Enter start location"
            value={startInput}
            onChange={(e) => setStartInput(e.target.value)}
          />
          <input
            type="text"
            name="end"
            placeholder="Enter end location"
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
          />
          <input type="submit" value="Generate path" />
        </form>
        <div className={styles.result} style={{ whiteSpace: 'pre-line' }}>
          {result}
          </div>
      </main>
    </div>
  );
}
