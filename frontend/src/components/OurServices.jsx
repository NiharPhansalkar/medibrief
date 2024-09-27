import React from 'react'
import "../styles/ourServices.css"
import inputpdf from "../assets/inputpdf.png"
import OcrImg from "../assets/OcrImg.png"
import summaryImg from "../assets/summaryImg.png"
import searchImg from "../assets/searchImg.png"


const OurServices = () => {
    return (
        <div className="services-container flex flex-col justify center items center w-full mb-20">
          <h2 className="services-title heading-font"  id="scroll-services">Our services</h2>
          <hr />
          <p className="services-description" >
          We offer a tailored solution to help you summarize medical texts efficiently. The provided summaries ensure you're accessing accurate and reliable information. You can consult with our system to summarize any medical text of your choice.
          </p>
          <div className="services-grid" >
            <div className="service-card">
              <img src={inputpdf} alt="Search doctor" className="service-icon" />
              <h3 className="subheading-font">Upload PDF/Image</h3>
              <p>Upload your medical notes/reports that you want to summarise.</p>
            </div>
            <div className="service-card">
              <img src={OcrImg} alt="Online pharmacy" className="service-icon" />
              <h3 className="subheading-font">OCR Conversion</h3>
              <p>Our system will convert your printed document into text that our model understands.</p>
            </div>
            <div className="service-card">
              <img src={summaryImg} alt="Consultation" className="service-icon" />
              <h3 className="subheading-font" >Summarization</h3>
              <p>The OCR generated text will be effectivly summarized by the John Snow Labs model.</p>
            </div>
            <div className="service-card">
              <img src={searchImg} alt="Details info" className="service-icon" />
              <h3 className="subheading-font" >Accurate Summary</h3>
              <p>An accurate, concise summary will be generated and displayed for your use.</p>
            </div>
          </div>
        </div>
      );
}

export default OurServices