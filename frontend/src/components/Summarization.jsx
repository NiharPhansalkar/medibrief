import React, { useState, useRef } from 'react';
import axios from 'axios';
import { AiOutlineUpload, AiOutlineCheck, AiOutlineFileImage } from 'react-icons/ai';
import '../styles/fileUpload.css';
import * as pdfjs from 'pdfjs-dist'
import * as pdfjsLib from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const Summarization = () => {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('select');
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      if (file.type === 'application/pdf') {
        await handlePDFUpload(file);
      } else {
        await handleImageUpload(file);
      }
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = '';
    setSelectedFile(null);
    setSummary('');
    setProgress(0);
    setUploadStatus('select');
    setShowSummary(false);
    setIsSummarizing(false);
  };

  const handleImageUpload = async (file) => {
    const validExtensions = ['png', 'jpg', 'jpeg', 'pdf'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      alert('Invalid file type. Please upload a .png, .jpg, or .jpeg file.');
      return;
    }

    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'http://localhost:5000/noteUpload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (response.status === 200) {
        setProgress(100);
        setUploadStatus('done');
        
        // Extract and clean the text here
        let extractedText = response.data.extracted_text;
        extractedText = extractedText
          .replace(/^document,\d+,\d+,/, '')  // Removes "document,x,y,"
          .replace(/,\[object Object\]$/, '');  // Removes ",[object Object]" at the end
        
        setExtractedText(extractedText);
        console.log(extractedText);

      } else {
        alert('File upload failed.');
        setUploadStatus('select');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('select');
    }
  };

  const handlePDFUpload = async (file) => {
    try {
      setUploadStatus('uploading');
      const pdfText = await extractTextFromPDF(file);
      setProgress(100);
      setUploadStatus('done');
      setExtractedText(pdfText);
      console.log(pdfText);
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('Failed to process PDF file.');
      setUploadStatus('select');
    }
  };

  const extractTextFromPDF = async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    let text = '';
    
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      text += pageText + '\n'; // Add a newline after each page
    }
    
    return text;
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setProgress(0);

    // Artificial progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 10;
        } else {
          clearInterval(progressInterval);
          return prevProgress;
        }
      });
    }, 300);

    try {
      const response = await axios.post(
        'http://localhost:5000/summarize',
        { text: extractedText }
      );

      if (response.status === 200) {
        clearInterval(progressInterval);
        const resultArray = response.data.result;
        let cleanedSummary = resultArray[0][3]; // Accessing the 4th item in the first sub-array
        cleanedSummary = cleanedSummary
          .replace(/^document,\d+,\d+,/, '')  // Removes "document,x,y,"
          .replace(/,\[object Object\]$/, '');  // Removes ",[object Object]" at the end

        setSummary(cleanedSummary);
        setProgress(100);
        setIsSummarizing(false);
        setShowSummary(true);
        setUploadStatus('summarized');
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      clearInterval(progressInterval);
      setIsSummarizing(false);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col w-full p-5 h-full bg-white" id="summarize">
      <h2 className="heading-font my-5">Summarize Your Medical Reports</h2>
      <h2 className="subheading-font mb-5">Click Below to Upload Your Medical Reports</h2>

      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <AiOutlineUpload size={24} style={{ marginRight: '8px' }} /> Upload File
        </button>
      )}

      {selectedFile && (
        <>
          <div className="file-card">
            <AiOutlineFileImage size={30} className="icon" />

            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile.name}</h6>
                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === 'uploading' ? (
                <div className="check-circle">{`${progress}%`}</div>
              ) : uploadStatus === 'done' || uploadStatus === 'summarized' ? (
                <div className="check-circle">
                  <AiOutlineCheck size={20} className="check-icon" />
                </div>
              ) : null}
            </div>
          </div>

          {uploadStatus === 'done' && (
            <button className="file-btn mt-7" onClick={handleSummarize} disabled={isSummarizing}>
              {isSummarizing ? (
                `Summarizing... ${progress}%`
              ) : (
                <>
                  <AiOutlineUpload size={20} style={{ marginRight: '8px' }} /> Summarize
                </>
              )}
            </button>
          )}

          {uploadStatus === 'summarized' && (
            <button className="file-btn mt-7" onClick={clearFileInput}>
              Reset
            </button>
          )}
        </>
      )}

      <textarea
        className="border-2 border-blue-500 rounded-md p-2 focus:outline-none my-10"
        rows={8}
        cols={100}
        placeholder="Summary will appear here..."
        value={summary}
        readOnly
      />
    </div>
  );
};

export default Summarization;
