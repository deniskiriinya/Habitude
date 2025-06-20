import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import '../styles/AdminUserPage.css';

export default function AdminPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div className="admin-page">
      <h1>📬 Admin Dashboard - Messages</h1>
      <div className="message-list">
        {messages.map(msg => (
          <div className="message-card" key={msg.id}>
            <h3>{msg.name} ({msg.email})</h3>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp.seconds * 1000).toLocaleString()}</small>
          </div>
        ))}
        {messages.length === 0 && <p>No messages yet.</p>}
      </div>
    </div>
  );
}