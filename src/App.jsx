import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import hero from '/images/hero.png';
import WriteBlog from './pages/WriteBlog';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from './firebaseconfig';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleWriteBlog = () => {
    navigate('/write-blog');
  };

  return (
    <div className="App">
      <Header user={user} />

      <div className="hero-image-container">
        <img src={hero} alt="Hero" className="hero-image" />
      </div>

      {user && (
        <div className="write-blog-container">
          <button className="write-blog-button" onClick={handleWriteBlog}>
            ✍️ Write a Blog
          </button>
        </div>
      )}

      <Routes>
        <Route path="/write-blog" element={<WriteBlog />} />
      </Routes>
    </div>
  );
}

export default App;
