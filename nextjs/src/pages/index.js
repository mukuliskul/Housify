import React, { useState } from "react";

const SUMMARIZE_URL = "http://localhost:3000/api/summarize";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const summarizeText = (text) => {
    const newSessionId = Date.now().toString(); // Generate a unique session ID
    setSessionId(newSessionId); // Set the session ID

    setIsLoading(true);
    fetch(SUMMARIZE_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, sessionId: newSessionId, isInitialMessage: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMessages(prev => [...prev, { sender: "system", content: data.message }]);
      })
      .catch((error) => {
        console.error("Error summarizing text:", error);
        setIsLoading(false);
      });
  };

  const onLoadFile = function () {
    const typedarray = new Uint8Array(this.result);
    pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
      console.log("loaded pdf:", pdf.numPages);
      let promises = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        promises.push(pdf.getPage(pageNum).then(page => page.getTextContent().then(textContent => textContent.items.map(item => item.str).join(" "))));
      }
      Promise.all(promises).then(pagesText => {
        const allText = pagesText.join(" ");
        summarizeText(allText);
      });
    });
  };

  const onChangeFileInput = (event) => {
    const file = event.target.files[0];
    if (file?.type !== "application/pdf") {
      console.error("The file uploaded is not a PDF file.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = onLoadFile;
    fileReader.readAsArrayBuffer(file);
  };

  React.useEffect(() => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.addEventListener("change", onChangeFileInput);
    }
  }, []);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    fetch(SUMMARIZE_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userInput, sessionId, isInitialMessage: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setMessages(prev => [...prev, { sender: "system", content: data.message }]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setIsLoading(false);
      });

    setMessages(prev => [...prev, { sender: "user", content: userInput }]);
    setUserInput("");
  };

  return (
    <main className="flex relative min-h-screen flex-col items-center py-12 px-12">
      <input className="hidden" id="file-input" type="file" />

      <div className="mt-8 w-full max-w-md mx-auto">
        <div className="messages border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto" style={{ height: '300px' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <p className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="input-area flex">
          <button onClick={() => document.getElementById("file-input").click()} className="rounded gap-4 text-white bg-gradient-to-tr from-orange-400 to-orange-500 px-6 py-2 pointer-events-auto h-[100%]">
            Upload and Interpret
          </button>
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="border border-gray-300 flex-grow p-2 rounded-l-lg" placeholder="Type your message here..." onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
          <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-lg">Send</button>
        </div>
      </div>
    </main>
  );
}
