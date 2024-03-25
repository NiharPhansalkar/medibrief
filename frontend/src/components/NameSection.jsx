import "../styles/nameSectionStyles.css";

const NameSection = () => {
  return (
    <div className="flex flex-row justify-evenly w-full p-4 name-section" id="home">
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-medium text-4xl my-6 font-lilitaOne">A TOOL FOR MEDICAL TEXT SUMMARIZATION</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[12rem]">
          Know More
        </button>
      </div>
      <div>
        <img src="https://gotodoctor.ca/wp-content/uploads/2021/05/illustration4.png" alt="Medical Illustration" />
      </div>
    </div>
  );
}

export default NameSection;
