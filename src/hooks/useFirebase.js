import  {useState, useEffect} from 'react';

export default (collection = [], opts = {sortField :'id', sortOrder :'asc'}) => {

    const [data, setData] = useState([]);

    const {sortField, sortOrder} = opts;

    useEffect(() => {

        let didCancel = false;
        const getData = async () => {
            
            const snapshot = await collection.orderBy(sortField, sortOrder).get();
            const docs = snapshot.docs;
            let tempArr = [];
            docs.forEach(d => {
                const rec = d.data();
                tempArr.push(rec);
            });
            setData(tempArr);
        }
       
        if(!didCancel){
            getData();
        }

        return () => didCancel = true;
    },[collection, sortField, sortOrder])

    return data;

}