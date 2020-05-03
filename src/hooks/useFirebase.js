import  {useState, useEffect} from 'react';

export default (initialUri = "", initialOpts = {}) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [uri, setUri] = useState(initialUri);
    const [opts, setOpts] = useState(initialOpts);

    useEffect(() => {

        let didCancel = false;
        const getData = async () => {
            
            const res = await fetch(uri, opts);

            if(!res.ok){
                setError({status: res.status, text: res.statusText});
            }

            const docs = await res.json();
            setData(docs);
        }
       
        if(!didCancel && initialUri !== ""){
            getData();
        }

        return () => didCancel = true;
    },[uri, opts])

    return [data,error];

}