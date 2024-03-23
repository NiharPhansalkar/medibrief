import "../styles/nameSectionStyles.css";

const JohnSnow = () => {
  return (
    <div className="flex flex-row justify-evenly w-full p-4 name-section">
      <div className="flex flex-col justify-center items-start w-[50%] mx-10">
        <h2 className="font-medium text-6xl my-1 font-lilitaOne">OUR RESEARCH INSPIRATION</h2>
        <p className="text-xl my-5 text-balance">While dealing with excessive amounts of handwritten clinical notes, medical professionals have a significant difficulty in effectively understanding diagnoses. We provide a solution that makes use of cutting-edge Clinical Natural Language Processing (NLP) to address this challenge head-on. Our goal is to improve medical documentation accuracy and efficiency by automating the summarization of handwritten clinical notes, with its multilingual support and automated important information extraction feature.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[12rem]">
          Next
        </button>
      </div>
      <div>
        <img src="https://www.johnsnowlabs.com/wp-content/uploads/2019/07/johnsnowlabs_logo.png" alt="Medical Illustration" className="w-[600px] my-40"/>
      </div>
    </div>
  );
}

export default JohnSnow;
