import React, { useState } from 'react';
import axios from 'axios'
const Summarization = () => {
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [inputText, setInputText] = useState('');
  const handleSummarize = async () => {
    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        text: inputText
      });

      setSummary(response.data.summary);
      setShowSummary(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="flex justify-start justify-items-start items-center flex-col w-full p-5 " id="summarize">
        <h2 className="font-medium text-6xl font-lilitaOne my-5">SUMMARIZE YOUR TEXT</h2>
        <textarea
          className="border-2 border-blue-500 rounded-md p-2 focus:outline-none my-10"
          rows={10}
          cols={50}
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[12rem]"
          onClick={handleSummarize}
        >
          Summarize
        </button>
        {showSummary && (
        <>
            <textarea
            className="border-2 border-blue-500  rounded-md p-2  focus:outline-none my-5"
            rows={10}

            cols={50}
            value={`Summary: ${summary}`} 
            readOnly
          />
        </>
        )}
      </div>
    </>
  );
}

export default Summarization;
