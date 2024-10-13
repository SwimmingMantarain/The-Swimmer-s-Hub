import React from 'react';
import CalendarView from './CalendarView';
import CompetitionStats from './CompetitionStats';
import VideoUpload from './VideoUpload';

const Dashboard = () => {
  return (
    <main className="dashboard">
      <section id="sessions">
        <h2>Upcoming Training Sessions</h2>
        <CalendarView />
      </section>

      <section id="stats">
        <h2>Recent Competition Stats</h2>
        <CompetitionStats />
      </section>

      <section id="upload">
        <h2>Upload Your Swimming Videos</h2>
        <VideoUpload />
      </section>
    </main>
  );
};

export default Dashboard;
