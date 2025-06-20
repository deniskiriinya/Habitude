import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">HabitTracker</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Contacts">Contacts</Link>
          {user ? (
            <button onClick={logout} className="logout-btn">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}