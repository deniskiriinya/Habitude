import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


import Header from './components/Header';
import HomePage from './Pages/HomePage';
import CookingPage from './Pages/CookingPage';
import ExercisingPage from './Pages/ExercisingPage';
import PrayingPage from './Pages/PrayingPage';
import MeditationPage from './Pages/MeditationPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HabitTemplate from './Pages/HabitTemplate';
import ContactPage from './Pages/ContactPage';
import AdminPage from './Pages/AdminPage'; 
import UserPage from './Pages/UserPage';// ✅ Import added
 // ✅ Import added

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactPage />} />
          
<Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
<Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} /> {/* ✅ Contact Page Route */}

          {/* Default Habit Pages (Protected) */}
          <Route path="/cooking" element={
            <ProtectedRoute>
              <CookingPage />
            </ProtectedRoute>
          } />
          <Route path="/exercising" element={
            <ProtectedRoute>
              <ExercisingPage />
            </ProtectedRoute>
          } />
          <Route path="/praying" element={
            <ProtectedRoute>
              <PrayingPage />
            </ProtectedRoute>
          } />
          <Route path="/meditation" element={
            <ProtectedRoute>
              <MeditationPage />
            </ProtectedRoute>
          } />

          {/* Fallback for custom user-created habit pages */}
          <Route path="/*" element={<ProtectedRoute><HabitTemplate /></ProtectedRoute>} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
