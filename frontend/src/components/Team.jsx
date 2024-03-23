import "../styles/nameSectionStyles.css";
import React from 'react';

const TeamMember = ({ name, description, imageUrl }) => {
  return (
    <div>
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt={name} />
      <div className="px-6 py-4 bg-gray-50">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
    </div>
  );
};

const OurTeam = () => {
  const teamMembers = [
    {
      name: 'Parshva Dani',
      description: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/112709071?v=4',
    },
    {
      name: 'Nihar Phansalkar',
      description: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/83259850?v=4',
    },
    {
      name: 'Prashistha Priyadarshini',
      description: '',
      imageUrl: 'https://avatars.githubusercontent.com/u/109412601?v=4',
    },
    {
      name: 'Ojaswini Kohale',
      description: '',
      imageUrl: '',
    },
  ];

  return (
    <>
    <section className="text-gray-700 body-font mx-20">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-4xl font-bold font-lilitaOne text-center mb-12">Our Team</h1>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 md:w-1/4">
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default OurTeam;
