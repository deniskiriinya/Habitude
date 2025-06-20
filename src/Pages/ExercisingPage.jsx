// src/Pages/ExercisingPage.jsx
import React from 'react';
import Timer from '../components/Timer';
import '../styles/ExercisingPage.css';

const videos = [
  { title: "5 Min Morning Workout", url: "https://www.youtube.com/embed/1f8yoFFdkcY" },
  { title: "Quick Full Body", url: "https://www.youtube.com/embed/UBMk30rjy0o" },
  { title: "Stretch & Flex", url: "https://www.youtube.com/embed/sTANio_2E0Q" },
  { title: "Home Cardio", url: "https://www.youtube.com/embed/ml6cT4AZdqI" },
  { title: "Beginner Yoga", url: "https://www.youtube.com/embed/v7AYKMP6rOE" },
];

export default function ExercisingPage() {
  const handleTimerComplete = () => {
    alert("Great job! You completed your session!");
  };

  return (
    <div className="exercise-page">
      <h1>Exercise Tracker</h1>
      <div className="timer-section">
        <h2>Workout Timer</h2>
        <Timer initialTime={300} onComplete={handleTimerComplete} />
      </div>
      <h2>Workout Videos</h2>
      <div className="videos-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
