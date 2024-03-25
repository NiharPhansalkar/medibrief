const Summarization = () => {
  return (
    <>
      <div className="flex justify-start justify-items-start items-center flex-col w-full p-5" id="summarize">
        <h2 className="font-medium text-6xl font-lilitaOne my-5">SUMMARIZE YOUR TEXT</h2>
        <textarea
          className="border-2 border-blue-500 rounded-md p-2 focus:outline-none my-10"
          rows={10}
          cols={50}
          placeholder="Enter your text here..."
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-[12rem]">
            Summarize
        </button>
      </div>
    </>
  );
}

export default Summarization;
