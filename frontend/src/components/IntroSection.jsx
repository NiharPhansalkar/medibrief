import MedicalImage from "../assets/medical_image1.jpg";
import "../styles/introSection.css";

const IntroSection = () => {
  return (
    <div className="flex flex-row justify-evenly w-full p-4" id="introduction" id="scroll-about">
      <div className="w-[50%] mx-10">
        <img src={MedicalImage} alt="Medical Illustration" className="w-[750px]" />
      </div>
      <div className="flex flex-col justify-center items-start w-[50%] mx-10">
        <h2 className="my-1 heading-font">AI IN USE: Natural Language Processing</h2>
        <div className="hr-container">
          <hr id="horizontal-line"/>
        </div>
        <p className="subheading-font my-5">
          While dealing with excessive amounts of handwritten clinical notes, medical professionals have a significant difficulty in effectively understanding diagnoses. We provide a solution that makes use of cutting-edge Clinical Natural Language Processing (NLP) to address this challenge head-on. Our goal is to improve medical documentation accuracy and efficiency by automating the summarization of handwritten clinical notes, with its multilingual support and automated important information extraction feature.
        </p>
        <button 
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:border-blue-400 font-bold py-2 px-4 rounded-full w-[9rem]" 
            onClick={() => document.getElementById('jsl-link-button').scrollIntoView({ behavior: 'smooth' })}
          >
            Next
        </button>
      </div>
    </div>
  );
}

export default IntroSection;
