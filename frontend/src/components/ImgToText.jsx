import React from 'react';
import { useState } from 'react';
import axios from 'axios';

// Define your component
const UploadImage = ({ msg, extractedText }) => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

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
        setContent(response.data.extracted_text);
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };  

  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section id="hero">
        <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
          <h2 className="font-medium text-4xl my-6 font-lilitaOne">
            UPLOAD A TEXT IMAGE FILE
        </h2>
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
          
          <div>
            <strong
              className="bi bi-arrow-down-circle"
              style={{ color: 'white' }}
            ></strong>
          </div>
        </div>
      </section>

      {/* Result Section */}
      <div id="hero">
        <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
          <div className="transparent-box" style={{ overflow: 'auto' }}>
            <div>
              <textarea
              className="border-2 border-blue-500  rounded-md p-2  focus:outline-none my-5"
              rows={8}
              cols={100}
              value={content}
              readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
