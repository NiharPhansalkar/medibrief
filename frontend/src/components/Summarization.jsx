import React, { useState } from 'react';
import axios from 'axios'
const Summarization = () => {
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  // const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload (you will need to implement the actual upload logic)
  const handleUpload = async (e) => {
    e.preventDefault();
  
    // Get the file from the input element
    const fileInput = document.querySelector('input[name="file"]');
    const file = fileInput.files[0];
  
    // Check if a file was selected
    if (!file) {
      alert('Please select a file.');
      return;
    }
  
    // Validate file extension
    const validExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
  
    if (!validExtensions.includes(fileExtension)) {
      alert('Invalid file type. Please upload a .png, .jpg, or .jpeg file.');
      return;
    }
  
    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      // Send the file to the backend using Axios
      const response = await axios.post('http://localhost:5000/noteUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle response from the backend
      if (response.status === 200) {
        alert('File uploaded successfully!');
        console.log(response);
        const summ_res = await axios.post('http://localhost:5000/summarize', {
          text: response.data.extracted_text
        });
  
        setSummary(summ_res.data.result);
        setShowSummary(true);
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  }
  // const handleSummarize = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/summarize', {
  //       text: inputText
  //     });

  //     setSummary(response.data.result);
  //     setShowSummary(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return (
    <>
      <div className="flex justify-start justify-items-start items-center flex-col w-full p-5 h-full" id="summarize">
        <h2 className="font-medium text-6xl font-lilitaOne my-5">SUMMARIZE YOUR TEXT IMAGE</h2>
        <div>
            <form onSubmit={handleUpload} encType="multipart/form-data">
              <p>
              <div className="flex justify-center">
                <input
                  className="bg-[#AAB396] mb-7 text-white font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-[#95a17c] transition-colors duration-300 ease-in-out"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-center">
                <input
                  className="bg-[#AAB396] text-white font-bold py-2 px-4 rounded-full w-[12rem] cursor-pointer"
                  type="submit"
                  value="Upload"
                  onClick={handleUpload}
                />
              </div>

              </p>
            </form>
          </div>
        <textarea
          className="border-2 border-blue-500 rounded-md p-2 focus:outline-none my-10"
          rows={8}
          cols={100}
          placeholder="Enter your text here..."
          value={summary}
        />
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[12rem]"
          onClick={handleSummarize}
        >
          Summarize
        </button>
        {showSummary && (
        <>
            <textarea
            className="border-2 border-blue-500  rounded-md p-2  focus:outline-none my-5"
            rows={8}

            cols={100}
            value={`Summary: ${summary}`} 
            readOnly
          />
        </>
        )} */}
      </div>
    </>
  );
}

export default Summarization;
