import React from 'react';
import About from './components/about';
import Contact from './components/contact';
import Home from './components/home';
import Navbar from './components/navbar';
import Skills from './components/skill';
import Portofolio from './components/portofolio';

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Portofolio />
        <Contact />
      </div>
    </div>
  );
}

export default App;
