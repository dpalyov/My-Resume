import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Resume from "./components/Resume";
import Services from "./components/Services";
import Skills from "./components/Skills";
import loader from "./assets/images/loader.gif";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useFirebase from "./hooks/useFirebase";

// const endpoint = 'https://api.github.com/graphql';
// const token = process.env.REACT_APP_GITHUB_TOKEN;
// const query = `query ($numRepos: Int!, $query:String!) {

//   search(type:REPOSITORY,query: $query, last: $numRepos) {
//       nodes {
//         ... on Repository {
//             languages(first:5) {
//              ...on LanguageConnection {
//                    nodes {
//                   name
//                 }
//             }
//           }
//           name
//           url
//           shortDescriptionHTML
//           isArchived
//         }
//       }
//     }
//   }
// `

const baseUri = 'https://us-central1-online-cv-476e2.cloudfunctions.net';

function App() {
    const defaultOpts = { "Content-Type": "application/json" };

    const [education,errEducation] = useFirebase(
        `${baseUri}/api/firestore/data/education?sortField=id&sortOrder=asc`,
        defaultOpts
    );
    const [experience,errExp] = useFirebase(
        `${baseUri}/api/firestore/data/experience?sortField=id&sortOrder=asc`,
        defaultOpts
    );
    const [skills,errSkills] = useFirebase(
        `${baseUri}/api/firestore/data/skills?sortField=id&sortOrder=asc`,
        defaultOpts
    );
    const [services,errServices] = useFirebase(
        `${baseUri}/api/firestore/data/services?sortField=id&sortOrder=asc`,
        defaultOpts
    );
    const [repositories, errRepos] = useFirebase(`${baseUri}/api/githubRepos?username=dpalyov&numRepos=4`,defaultOpts);
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
                <Contact  />
                <Footer />
            </div>
        </div>
    );
}

export default App;
