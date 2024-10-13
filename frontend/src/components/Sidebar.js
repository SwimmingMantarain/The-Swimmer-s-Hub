import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="#upcoming">Upcoming Sessions</a></li>
        <li><a href="#recent">Recent Competitions</a></li>
        <li><a href="#favorites">Favorite Videos</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
