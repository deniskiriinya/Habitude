// src/components/HabitCard.jsx
import { Link } from 'react-router-dom';
import '../styles/HabitCard.css';

export default function HabitCard({ habit, onDelete }) {
  return (
    <div className="habit-card">
      <Link to={habit.link}>
        <img src={habit.image} alt={habit.name} />
        <h3>{habit.name}</h3>
        <p>{habit.description}</p>
      </Link>
      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      )}
    </div>
  );
}
