import { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import '../styles/PrayingPage.css';

export default function PrayingPage() {
  const [prayerType, setPrayerType] = useState('personal');
  const [prayerTime, setPrayerTime] = useState(300); // in seconds
  const [reminder, setReminder] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [prayerHistory, setPrayerHistory] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const prayerConfig = {
    personal: {
      label: 'Personal Prayer',
      defaultTime: 300,
      message: 'Speak from your heart. Share your thoughts, gratitude, and requests.',
    },
    scripture: {
      label: 'Scripture Reading',
      defaultTime: 600,
      message: 'Read slowly and reflect on each verse. Let the words speak to you.',
    },
    contemplative: {
      label: 'Contemplative Prayer',
      defaultTime: 900,
      message: 'Be still and listen. Focus on your breathing and God\'s presence.',
    },
    intercessory: {
      label: 'Intercessory Prayer',
      defaultTime: 600,
      message: 'Pray for others. Lift up their needs before God.',
    },
  };

  // Set time to default when prayerType changes
  useEffect(() => {
    setPrayerTime(prayerConfig[prayerType].defaultTime);
  }, [prayerType]);

  const logPrayer = () => {
    const newEntry = {
      type: prayerType,
      date: selectedDate,
      completed: true,
    };
    setPrayerHistory([newEntry, ...prayerHistory]);
    alert('Prayer logged as completed 🙏');
  };

  const filteredHistory = prayerHistory.filter((entry) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'completed') return entry.completed;
    return !entry.completed;
  });

  return (
    <div className="praying-page">
      <div className="prayer-header">
        <h1>Sacred Prayer Space</h1>
        <p>Enter your time of communion and reflection</p>
      </div>

      <div className="calendar-date">
        <label>🗓️ Choose Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="prayer-selection">
        <h3>Choose Your Prayer Type</h3>
        <div className="prayer-options">
          {Object.entries(prayerConfig).map(([key, value]) => (
            <button
              key={key}
              className={prayerType === key ? 'active' : ''}
              onClick={() => setPrayerType(key)}
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>

      <div className="time-section">
        <h3>Prayer Duration (minutes)</h3>
        <input
          type="number"
          min="1"
          max="60"
          value={prayerTime / 60}
          onChange={(e) => setPrayerTime(Number(e.target.value) * 60)}
        />
        <div className="reminder-toggle">
          <label>
            <input
              type="checkbox"
              checked={reminder}
              onChange={() => setReminder(!reminder)}
            />
            Gentle reminder when time ends
          </label>
        </div>
      </div>

      <div className="prayer-timer-container">
        <Timer
          key={`${prayerType}-${prayerTime}`} // 🔁 This resets the Timer when type or time changes
          initialTime={prayerTime}
          onComplete={() => {
            if (reminder) {
              alert('Your prayer time has completed. Amen.');
              logPrayer();
            }
          }}
        />
      </div>

      <div className="prayer-guidance">
        <h3>Prayer Guidance</h3>
        <p>{prayerConfig[prayerType].message}</p>
      </div>

      <div className="history-section">
        <h3>📝 Prayer History</h3>
        <div className="filter-buttons">
          <button
            className={filterStatus === 'all' ? 'active' : ''}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button
            className={filterStatus === 'completed' ? 'active' : ''}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </button>
          <button
            className={filterStatus === 'incomplete' ? 'active' : ''}
            onClick={() => setFilterStatus('incomplete')}
          >
            Incomplete
          </button>
        </div>
        <ul className="history-list">
          {filteredHistory.length === 0 ? (
            <p>No prayer logs match this filter.</p>
          ) : (
            filteredHistory.map((entry, index) => (
              <li key={index}>
                {entry.date} — {prayerConfig[entry.type].label} —{' '}
                {entry.completed ? '✅ Completed' : '❌ Incomplete'}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
