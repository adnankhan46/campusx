import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { parseMarkdownToHtml } from '../utils/parseMarkdownToHtml'; // Import the function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google Generative AI SDK

function Chatbox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [parsedAnswer, setParsedAnswer] = useState(""); // State for parsed answer
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const chatBoxRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); // Initialize Google Generative AI instance

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function generateAnswer() {
    if (!question.trim()) {
      setError("Please enter a valid question.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const parts = [
        { text: "input: your name ?" },
        { text: "output: CampusAI" },
        { text: "input: you are ?" },
        { text: "output: An AI assistance named \"CampusAI by CampusX\" providing information about \"BIT Durg\" College's, trained and maintained by Google" },
        { text: "input: College Timing for First year BIT Durg, BTech ?" },
        { text: "output: College Timing for First year BIT Durg is from 9 AM to 4 PM (IST)" },
        { text: "input: College Timing for other year BIT Durg, BTech ?" },
        { text: "output: College Timing for other year BIT Durg is from 10 AM to 4 PM (IST)" },
        { text: "input: founders of Campus ai and campus x ?" },
        { text: "output: Adnan Khan and Garv Thakre" },
        { text: "input: what is Campusx?" },
        { text: "output: CampusX or CampusX-BITD is an Anonymous Social Networking Site specially for first year students to get introduced. CampusX also provides Economic Opportunites for students." },
        { text: `input: ${question}` }, // Including the user's question dynamically
      ];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
      });

      if (result.response && result.response.text) {
        const generatedAnswer = result.response.text();
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
    <div className="flex flex-col h-screen border shadow-lg overflow-y-auto rounded-lg mb-2">
      <div className="flex-1 p-4">
        {/* Chat history */}
        <div className="overflow-y-hidden">
          {history.map((item, index) => (
            <div key={index} className="flex flex-col space-y-2 mb-2">
              <div className="bg-blue-100 text-blue-800 p-2 text-base rounded-lg border shadow-md self-end border-blue-200">
                <p>{item.question}</p>
              </div>
              <div className=" bg-white text-gray-800 p-2 rounded-lg border text-base  self-start  shadow-md border-gray-200">
                <p><FontAwesomeIcon icon={faWandSparkles} className='md:h-6 h-4 mx-2 text-[#6a7cff]' />
                : <span dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(item.answer) }} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin text-blue-500 h-8 w-8 border-t-2 border-blue-500 border-solid rounded-full"></div>
        </div>
      )}
      {/* Fixed button and input section */}
      <div className="fixed bottom-24 w-full bg-white p-2 border-t border-gray-200">
        {error && <p className="text-red-500">{error}</p>}
        <input
          placeholder="Ask a question..."
          className="border rounded-full p-3 w-full text-gray-700 mb-2  outline-none"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`p-2 rounded-lg w-full ${isLoading ? 'bg-[#c9cfff]' : 'bg-[#6a7cff]'} text-white`}
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
