import React, { useState } from 'react';
import '../stylesheets/Notices.css';


const notices = [
  {
    title: 'Notice Regarding Suspension Order of Mohd. Zubair B. Pharma 4th Year Student of MPCPS',
    date: '24 OCT',
    link: '/notice1'
  },
  {
    title: 'Instructions for students',
    date: '23 OCT',
    link: '/notice2'
  },
  {
    title: 'Notice Regarding Login of students on Samarth Portal',
    date: '22 OCT',
    link: '/notice3'
  },
  {
    title: 'Notice for B.Tech I year students',
    date: '22 OCT',
    link: '/notice4'
  },
  {
    title: 'Most Important Notice for students regarding Vehicle Parking',
    date: '21 OCT',
    link: '/notice5'
  },
  {
    title: 'Office Order for Mrs. Nazneen Khan, Assistant Professor- BSH, MPEC',
    date: '20 OCT',
    link: '/notice6'
  }
];

const Notices = () => {
  const [activeNotice, setActiveNotice] = useState(null);

  const handleNoticeClick = (notice) => {
    setActiveNotice(notice);
  };

  return (
    <div className="notice-board">
      <h1>NOTICE</h1>
      <div className="notice-list">
        {notices.map((notice, index) => (
          <div className="notice-item" key={index}>
            <span>{notice.title}</span>
            <a href="#" onClick={() => handleNoticeClick(notice)}>CLICK HERE</a>
            <span className="date">{notice.date}</span>
          </div>
        ))}
      </div>

      {activeNotice && (
        <div className="notice-details">
          <h2>{activeNotice.title}</h2>
          <p>Date: {activeNotice.date}</p>
          <p>Details of the notice go here...</p>
          <button onClick={() => setActiveNotice(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Notices;