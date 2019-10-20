import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Resume from './components/Resume';
import Services from './components/Services';
import Skills from './components/Skills';
import loader from './assets/images/loader.gif';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div class="fh5co-loader" style={{background: `url(${loader}) center no-repeat #fff`}}></div>
	    <div id="page">
        <Header />
        <About />
        <Resume />
        <Services />
        <Skills />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
