import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import About from './components/About';
import Resume from './components/Resume';
import Services from './components/Services';
import Skills from './components/Skills';
import loader from './assets/images/loader.gif';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {expCollection} from './firebase.init';


function App() {

  const [experience, setExperience] = useState([]);
 

  useEffect(() => {
    expCollection.orderBy('id', 'asc').get()
        .then(snapshot => {
            const docs = snapshot.docs;
            let tempArr = [];
            docs.forEach(d => {
                const rec = d.data();
                tempArr.push(rec);
            })
            setExperience(tempArr);
        })
        .catch(() => {
            console.log('error downloading experience data')
        })
  }, [])

  return (
    <div className="App">
      <div className="fh5co-loader" style={{background: `url(${loader}) center no-repeat #fff`}}></div>
	    <div id="page">
        <Header />
        <About />
        <Resume exp={experience} />
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
