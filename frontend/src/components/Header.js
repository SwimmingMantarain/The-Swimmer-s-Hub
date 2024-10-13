import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>Aqua-Metrics</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#sessions">Training Sessions</a></li>
          <li><a href="#stats">Competition Stats</a></li>
          <li><a href="#upload">Upload Video</a></li>
          <li><a href="#profile">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
