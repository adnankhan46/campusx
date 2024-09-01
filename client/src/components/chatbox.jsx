  
import axios from 'axios';
import React, { useState, useRef } from 'react';

function Chatbox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const chatBoxRef = useRef(null);

  async function generateAnswer() {
    try {
      const response = await axios({
        // API_KEY: process.env.API_KEY,
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY",
        method: "POST",
        data: {
          contents: { parts: [{ text: question }] },
        },
      });

      const generatedAnswer = response.data.candidates[0].content.parts[0].text;
      setAnswer(generatedAnswer);
      setHistory((prevHistory) => [...prevHistory, { question, answer: generatedAnswer }]);

      setQuestion("");

       
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Failed to generate an answer.");
    }
  }

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg">
      <div className="flex-1   p-4" >
        {/* Chat history */}
        <div className="overscroll-y-auto">
          {history.map((item, index) => (
            <div key={index} className="flex flex-col space-y-2 mb-2">
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg border border-blue-200">
                <p><strong>Q:</strong> {item.question}</p>
              </div>
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-200">
                <p><strong>A:</strong> {item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fixed button and input section */}
      <div className="fixed-actions bg-white p-2 border-t border-gray-200">
        <input
          placeholder="Ask a question..."
          className="border rounded-lg p-2 w-full text-gray-700 mb-2"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
          onClick={generateAnswer}
        >
          Generate Answer
        </button>
      </div>
    </div>
  );
}

export default Chatbox;