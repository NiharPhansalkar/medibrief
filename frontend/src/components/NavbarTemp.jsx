import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MedibriefLogo from '../assets/newLogo.jpg';

const NavbarTemp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (href, isPageLink) => {
    if (isPageLink) {
      navigate(href);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => handleScroll(href.slice(1)), 100);
      } else {
        handleScroll(href.slice(1));
      }
    }
  };

  const navigation = [
    { name: 'Home', href: '#home', isPageLink: false },
    { name: 'Services', href: '#scroll-services', isPageLink: false },
    { name: 'About', href: '#introduction', isPageLink: false },
    { name: 'Summarization', href: '/summarization', isPageLink: true },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            M
          </div>
          <span className="ml-3 font-bold text-xl text-gray-800">Medibrief</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href, item.isPageLink)}
              className={`font-medium ${location.pathname === item.href || (location.pathname === '/' && item.href === '#home') ? 'font-bold text-black' : 'text-gray-500'} hover:text-blue-500 outline-none focus:outline-none focus:bg-transparent active:bg-transparent`}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavbarTemp;

