import { useLocation } from 'react-router-dom';
import Timer from '../components/Timer';
import '../styles/HabitTemplate.css';

export default function HabitTemplate() {
  const location = useLocation();
  const habitName = location.pathname.slice(1); // '/reading' -> 'reading'

  return (
    <div className="habit-template">
      <h1>{habitName.charAt(0).toUpperCase() + habitName.slice(1)}</h1>
      <p>Track your progress for {habitName}</p>
      <Timer initialTime={300} onComplete={() => alert('Time is up!')} />
    </div>
  );
}


