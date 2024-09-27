import "../styles/nameSectionStyles.css";
import { Link } from "react-router-dom";
import IntroSection from "./IntroSection";
import JohnSnow from "./JohnSnow";
import OurTeam from "./Team";
import Summarization from "./Summarization";
import IntroImg from "../assets/IntroImg.png";
const NameSection = () => {
  return (
    <div
      className="flex flex-row justify-evenly w-full p-4 name-section"
      id="home"
    >
      <div className="flex flex-col justify-center ">
        <h2 className="font-medium text-4xl my-6 font-lilitaOne">
          A Tool for medical notes 
          <br/>
          summarization
        </h2>
        <p className="w-96">
          Medibrief provides a platform to efficiently summarize your medical notes
        </p>
        <br/>
        <Link to="/summarization">
          <button className="bg-[#458FF6] text-white font-bold py-3 px-4 rounded-full w-[9rem]" >
            Try Now!
          </button>
        </Link>
      </div>
      <div>
        <img className="Intro-image"
          src={IntroImg}
          alt="Medical Illustration"
        />
      </div>
    </div>
    
    
  );
};

export default NameSection;
