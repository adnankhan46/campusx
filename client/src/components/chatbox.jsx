import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { parseMarkdownToHtml } from '../utils/parseMarkdownToHtml'; // Import the function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';

function Chatbox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [parsedAnswer, setParsedAnswer] = useState(""); // State for parsed answer
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const chatBoxRef = useRef(null);

  async function generateAnswer() {
    if (!question.trim()) {
      setError("Please enter a valid question.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        method: "POST",
        data: {
          contents: { parts: [{ text: question }] },
        },
      });

      if (
        response.data &&
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts[0].text
      ) {
        const generatedAnswer = response.data.candidates[0].content.parts[0].text;
        setAnswer(generatedAnswer);
        setHistory((prevHistory) => [...prevHistory, { question, answer: generatedAnswer }]);
      } else {
        setAnswer("Unexpected response structure.");
        setError("Failed to generate an answer.");
      }

    } catch (error) {
      console.error("Error generating answer:", error);

      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      setAnswer("Failed to generate an answer.");
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  }

  useEffect(() => {
    // Parsing the answer whenever it changes
    if (answer) {
      const parsed = parseMarkdownToHtml(answer);
      setParsedAnswer(parsed);
    }
  }, [answer]);

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg mb-24">
      <div className="flex-1 p-4">
        {/* Chat history */}
        <div className="overflow-y-auto">
          {history.map((item, index) => (
            <div key={index} className="flex flex-col space-y-2 mb-2">
              <div className="bg-blue-100 text-blue-800 p-2 text-base rounded-lg border border-blue-200">
                <p><strong>Q:</strong> {item.question}</p>
              </div>
              <div className="bg-[#ffffff] text-gray-800 p-2 rounded-lg border text-base border-gray-200">
               <p><FontAwesomeIcon icon={faWandSparkles} className='md:h-6 h-4 mx-2 text-[#6a7cff]' />
               :
               <span dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(item.answer) }} />
               </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fixed button and input section */}
      <div className="fixed bottom-24 w-full bg-white p-2 border-t border-gray-200">
        {error && <p className="text-red-500">{error}</p>}
        <input
          placeholder="Ask a question..."
          className="border rounded-lg p-3 w-full text-gray-700 mb-2 outline-none"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`p-2 rounded-lg w-full ${isLoading ? 'bg-[#6a7cff]' : 'bg-[#6a7cff]'} text-white`}
          onClick={generateAnswer}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Answer"}
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
