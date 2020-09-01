import  {useState, useEffect} from 'react';

export default (initialUri = "", initialOpts = {}) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [uri, setUri] = useState(initialUri);
    const [opts, setOpts] = useState(initialOpts);

    useEffect(() => {

        const ac = new AbortController();
        const getData = async () => {
            
            const res = await fetch(uri, {...opts, signal: ac.signal});

            if(!res.ok){
                setError({status: res.status, text: res.statusText});
            }

            const docs = await res.json();
            setData(docs);
        }
       
            getData();

        return () => ac.abort();

    },[uri, opts]);

    function refetch(uri, opts = {}) {
        setUri(uri);
        setOpts(opts);
    }

    return [data,error, refetch];

}