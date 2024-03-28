import "../styles/nameSectionStyles.css";
import { Link } from "react-router-dom";
import IntroSection from "./IntroSection";
import JohnSnow from "./JohnSnow";
import OurTeam from "./Team";
import Summarization from "./Summarization";
const NameSection = () => {
  return (
    <div
      className="flex flex-row justify-evenly w-full p-4 name-section"
      id="home"
    >
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-medium text-4xl my-6 font-lilitaOne">
          A TOOL FOR MEDICAL TEXT SUMMARIZATION
        </h2>
        <Link to="/summarization">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[12rem]">
            Know More
          </button>
        </Link>
      </div>
      <div>
        <img
          src="https://gotodoctor.ca/wp-content/uploads/2021/05/illustration4.png"
          alt="Medical Illustration"
        />
      </div>
    </div>
    
    
  );
};

export default NameSection;
