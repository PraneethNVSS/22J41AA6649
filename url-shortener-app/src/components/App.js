import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerPage from './routes/ShortenerPage';
import StatisticsPage from './routes/StatisticsPage';
import RedirectHandler from './routes/RedirectHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
