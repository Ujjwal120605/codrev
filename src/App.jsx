import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Apppp from './Apppp';
import About from './components/about'; // or wherever your about file is located

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Apppp />} />
        <Route path="/app/about" element={<About />} /> {/* Changed from <about /> to <About /> */}
      </Routes>
    </Router>
  );
};

export default App;