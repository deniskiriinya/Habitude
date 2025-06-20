import '../styles/ContactsPage.css';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        timestamp: Timestamp.now(),
      });
      setSuccess('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('❌ Failed to send message. Try again.');
    }
  };

  return (
    <div className="contacts-page">
      <div className="contacts-hero">
        <h1>💬 Let's Connect</h1>
        <p>Your wellness journey matters — and we're here to support you every step of the way!</p>
      </div>

      <div className="contacts-message">
        <h2>📨 Get in Touch</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows="5"
              required
            />
          </div>

          <button type="submit">Send Message</button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="contact-note">
        <p>⏳ We aim to respond within 24 hours. Thank you for reaching out!</p>
      </div>
    </div>
  );
}
