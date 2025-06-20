import { useState } from 'react';
import Timer from '../components/Timer';
import '../styles/MeditationPage.css';

export default function MeditationPage() {
  const [sessionType, setSessionType] = useState('guided');
  const [backgroundSound, setBackgroundSound] = useState('rain');

  return (
    <div className="meditation-page">
      <header className="meditation-header">
        <h1>Meditation Space</h1>
        <p>Find your calm and focus your mind</p>
      </header>

      <div className="meditation-controls">
        <div className="session-type">
          <h3>Session Type</h3>
          <div className="toggle-buttons">
            <button 
              className={sessionType === 'guided' ? 'active' : ''}
              onClick={() => setSessionType('guided')}
            >
              Guided
            </button>
            <button 
              className={sessionType === 'silent' ? 'active' : ''}
              onClick={() => setSessionType('silent')}
            >
              Silent
            </button>
          </div>
        </div>

        <div className="sound-options">
          <h3>Background Sound</h3>
          <select 
            value={backgroundSound}
            onChange={(e) => setBackgroundSound(e.target.value)}
          >
            <option value="rain">Rain</option>
            <option value="waves">Ocean Waves</option>
            <option value="forest">Forest</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className="meditation-timer">
        <h3>Set Your Meditation Time</h3>
        <Timer 
          initialTime={300}  // 5 minutes default
          showControls={true}
          onComplete={() => console.log('Meditation session complete!')}
        />
      </div>

      <div className="meditation-tips">
        <h3>Meditation Tips</h3>
        <ul>
          <li>Find a comfortable sitting position</li>
          <li>Focus on your breath</li>
          <li>Don't worry about wandering thoughts</li>
          <li>Start with short sessions and gradually increase</li>
        </ul>
      </div>
    </div>
  );
}