import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Tracks } from './pages/Tracks';
import { TrackDetail } from './pages/TrackDetail';
import { Mentor } from './pages/Mentor';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Journal } from './pages/Journal';
import { MentorDashboard } from './pages/MentorDashboard';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/tracks/:id" element={<TrackDetail />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/dashboard" element={<MentorDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}