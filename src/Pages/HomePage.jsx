import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HabitCard from '../components/HabitCard';
import '../styles/HomePage.css';

const defaultHabits = [
  { id: 1, name: 'Cooking', description: 'Prepare healthy meals', image: '/images/cooking.jpg', link: '/cooking', isDefault: true },
  { id: 2, name: 'Exercising', description: 'Daily exercise', image: '/images/exercise.jpg', link: '/exercising', isDefault: true },
  { id: 3, name: 'Praying', description: 'Spiritual time', image: '/images/praying.jpg', link: '/praying', isDefault: true },
  { id: 4, name: 'Meditation', description: 'Mindfulness', image: '/images/meditation.jpg', link: '/meditation', isDefault: true }
];

export default function HomePage() {
  const navigate = useNavigate();

  const [customHabits, setCustomHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: '', description: '', image: '', link: '' });
  const [showForm, setShowForm] = useState(false);
  const [habitToNavigate, setHabitToNavigate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit({ ...newHabit, [name]: value });
  };

  const handleAddHabit = () => {
    const newId = defaultHabits.length + customHabits.length + 1;
    const newOne = { ...newHabit, id: newId, isDefault: false };

    setCustomHabits([...customHabits, newOne]);
    setHabitToNavigate(newOne.link); // store link for navigation
    setNewHabit({ name: '', description: '', image: '', link: '' });
    setShowForm(false);
  };

  // 🔁 Navigate AFTER the habit is added
  useEffect(() => {
    if (habitToNavigate) {
      navigate(habitToNavigate);
      setHabitToNavigate(null); // reset
    }
  }, [habitToNavigate, navigate]);

  const handleDeleteHabit = (id) => {
    setCustomHabits(customHabits.filter(habit => habit.id !== id));
  };

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>Welcome to HabitTracker</h1>
        <p>Build better habits one day at a time</p>
      </section>

      <section className="habits-section">
        <h2>Your Daily Habits</h2>
        <div className="habits-grid">
          {[...defaultHabits, ...customHabits].map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onDelete={!habit.isDefault ? handleDeleteHabit : undefined}
            />
          ))}
        </div>
      </section>

      <section className="add-habit">
        <h2>Add New Habit</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Custom Habit'}
        </button>

        {showForm && (
          <div className="habit-form">
            <input type="text" name="name" placeholder="Habit Name" value={newHabit.name} onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Description" value={newHabit.description} onChange={handleInputChange} />
            <input type="text" name="image" placeholder="Image URL" value={newHabit.image} onChange={handleInputChange} />
            <input type="text" name="link" placeholder="Link (e.g. /reading)" value={newHabit.link} onChange={handleInputChange} />
            <button onClick={handleAddHabit}>Add Habit</button>
          </div>
        )}
      </section>
    </div>
  );
}
