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
import {expCollection, educationCollection, skillsCollection, servicesCollection, emailCollection} from './firebase.init';
import useFirebase from './hooks/useFirebase';

const endpoint = 'https://api.github.com/graphql';
const token = process.env.REACT_APP_GITHUB_TOKEN;
const query = `query ($numRepos: Int!, $query:String!) {
   
  search(type:REPOSITORY,query: $query, last: $numRepos) {
      nodes {
        ... on Repository {
            languages(first:5) {
             ...on LanguageConnection {
                   nodes {
                  name
                }
            }
          }
          name
          url
          shortDescriptionHTML
          isArchived
        }
      }
    }
  }
`

function App() {

  const education = useFirebase(educationCollection, {sortField: 'id', sortOrder: 'asc'});
  const experience = useFirebase(expCollection, {sortField : 'id', sortOrder : 'asc'});
  const skills = useFirebase(skillsCollection, {sortField: 'id', sortOrder: 'asc'})
  const services = useFirebase(servicesCollection);
  const [repositorires, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let ac = new AbortController();

    const getRepos = async () => 
    {
        try{
          const res = await fetch(endpoint, 
              {
                  method: 'POST',
                  credentials: 'same-origin', 
                  body: JSON.stringify({
                      query: query, 
                      variables: {username: 'dpalyov', numRepos: 4,query: "user:dpalyov is:public archived:false"}
                  }),
                  headers: {
                      'Content-type' : 'application/json',
                      'Authorization': 'Bearer ' + token
                  }
              })
    
            const json = await res.json();
            setRepositories(json.data.search.nodes);
        }
        catch(error){
            //TODO: Notification
        }
      }

      getRepos();
 

      return () => {
        ac.abort();
      }
      
  },[]);

  useEffect(() => {
    setTimeout(() => setLoading(false),1000); 
  },[])

  if(loading) return <div className="fh5co-loader fadeOut" style={{background: `url(${loader}) center no-repeat #fff`}}></div>

  return (
    <div className="App">
	    <div id="page">
        <Header pageLoaded={loading} />
        <About />
        <Resume exp={experience} education={education} />
        <Services data={services}/>
        <Skills data={skills}/>
        <Portfolio data={repositorires}/>
        <Contact emailCollection={emailCollection}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
