import {useState,useRef, useEffect} from 'react';


const useInterceptionObserver = ({root = null, rootMargin, threshold = 0}) => {

    const [node, setNode] = useState(null);
    const [entry, setEntry] = useState({});

    const observer = useRef(
        new IntersectionObserver(([entry]) => setEntry(entry),{
            root: root,
            rootMargin: rootMargin,
            threshold: threshold
        } )
    );

    useEffect(
        () => {
            const {current: currentObserver } = observer;
            currentObserver.disconnect();

            if(node) currentObserver.observe(node);

            return () => currentObserver.disconnect();
        },
        [node]
    );

    return [setNode, entry];

}

export default useInterceptionObserver;