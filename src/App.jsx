import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Apppp from './Apppp';
import About from './components/about'; 
import Contact from './components/contact'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Apppp />} />
        <Route path="/about" element={<About />} />  
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </Router>
  );
};

export default App;