import React, { useState, useRef } from 'react';
import axios from 'axios';
import { AiOutlineUpload, AiOutlineClose, AiOutlineCheck, AiOutlineFileImage } from 'react-icons/ai';
import '../styles/fileUpload.css';

const Summarization = () => {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('select');
  const [summary, setSummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = '';
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus('select');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const validExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      alert('Invalid file type. Please upload a .png, .jpg, or .jpeg file.');
      return;
    }

    try {
      setUploadStatus('uploading');

      const formData = new FormData();
      formData.append('file', selectedFile);

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
        const summ_res = await axios.post('http://localhost:5000/summarize', {
          text: response.data.extracted_text,
        });

        setSummary(summ_res.data.result);
        setShowSummary(true);
        setUploadStatus('done');
      } else {
        alert('File upload failed.');
        setUploadStatus('select');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('select');
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

              {uploadStatus === 'select' ? (
                <button onClick={clearFileInput}>
                  <AiOutlineClose size={20} className="close-icon" />
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === 'uploading' ? `${progress}%` : 
                   uploadStatus === 'done' ? (
                    <AiOutlineCheck size={20} className="check-icon" />
                  ) : null}
                </div>
              )}
            </div>
          </div>

          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === 'select' || uploadStatus === 'uploading' ? 
            <>
              <AiOutlineUpload size={20} style={{ marginRight: '8px' }} /> Upload 
            </> : 'Done'}
          </button>
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

