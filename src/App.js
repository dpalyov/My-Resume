import React, { useEffect, useState, useContext } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Resume from "./components/Resume";
import Services from "./components/Services";
import Skills from "./components/Skills";
import loader from "./assets/images/loader.gif";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useApi from "./hooks/useApi";
import Notification from "./components/Notification";
import { store } from "./store";


function App() {

    const { state } = useContext(store);
    const {notification} = state;

    const defaultOpts = { "Content-Type": "application/json" };

    const [education,errEducation] = useApi(
        `/api/data/education`,
        defaultOpts
    );
    const [experience,errExp] = useApi(
        `/api/data/experience`,
        defaultOpts
    );
    const [skills,errSkills] = useApi(
        `/api/data/skills`,
        defaultOpts
    );
    const [services,errServices] = useApi(
        `/api/data/services`,
        defaultOpts
    );
    const [repositories, errRepos] = useApi(
        `/api/data/repositories`
        ,defaultOpts);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading)
        return (
            <div
                className="fh5co-loader fadeOut"
                style={{ background: `url(${loader}) center no-repeat #fff` }}
            ></div>
        );

    if(errEducation || errExp || errRepos || errSkills || errServices){
      return <div>Ooops something went wrong!</div>
    }

    return (
        <div className="App">
            <div id="page">
                    <Header pageLoaded={loading} />
                    <About />
                    <Resume exp={experience} education={education} />
                    <Services data={services} />
                    <Skills data={skills} />
                    <Portfolio data={repositories} />
                    <Contact />
                    <Footer />
                    <Notification enabled={notification.enabled} text={notification.text} image={notification.image}/>
            </div>
        </div>
    );
}

export default App;
