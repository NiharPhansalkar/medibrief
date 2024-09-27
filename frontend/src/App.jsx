import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import NameSection from "./components/NameSection";
import IntroSection from "./components/IntroSection";
import JohnSnow from "./components/JohnSnow";
import Summarization from "./components/Summarization";
import Team from "./components/Team";
import ImgToText from "./components/ImgToText";
import OurServices from './components/OurServices';
import Footer from './components/Footer';
import NavbarTemp from './components/NavbarTemp';

const App = () => {
  return(
    <Router>
      <NavbarTemp />
      <Routes>
        <Route path="/" element={
          <div className='h-full'>
            <div className="bg-white-200 h-full flex items-center"><NameSection /></div>
            <div className="bg-white-200 h-full flex items-center mb-7"><OurServices /></div>
            <div className="bg-white-200 flex items-center "><IntroSection /></div>
            <div className="bg-white-200 flex items-center"><JohnSnow /></div>
            <div className="bg-white-200 flex items-center"><Footer /></div>
            {/* <div className="bg-white-200 flex items-center"><Team /></div> */}
          </div>
        } />
        <Route path="/intro" element={<div className="bg-white-200 h-full flex items-center"><IntroSection /></div>} />
        <Route path="/service" element={<div className="bg-white-200 h-full flex items-center"><OurServices /></div>} />
        <Route path="/john-snow" element={<div className="bg-gray-200 h-full flex items-center"><JohnSnow /></div>} />
        <Route path="/summarization" element={<div className="bg-gray-200 h-full flex items-center"><Summarization /></div>} />
        {/* <Route path="/team" element={<div className="bg-gray-200 flex items-center"><Team /></div>} /> */}
        <Route path="/imgtotext" element={<div className="#FFF8E8 flex items-center justify-center min-h-screen "><ImgToText /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
