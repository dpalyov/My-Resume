import React, { useState, useEffect, useContext } from "react";
import styles from "../css/Notification.module.css";
import { store } from "../store";

function Notification({enabled , text, image}) {
    const [hide, setHide] = useState(false);
    const {dispatch} = useContext(store);

    const handleClick = (event) => {
        if(enabled){
            setTimeout(() => {
                setHide(true);
                dispatch({
                    type: "NOTIFICATION",
                    payload: {enabled: false, text: text, image: image},
                })
            },1000)
            setHide(false)
        }
    };

    useEffect(() => {
        if (enabled) {
            setTimeout(() => {
                setHide(true)
                dispatch({
                    type: "NOTIFICATION",
                    payload: {enabled: false, text: text, image: image},
                })
            },5000)
            setHide(false)
            
        } 

    }, [enabled, text, image, dispatch]);


    return (
        <div onClick={handleClick}  className={`${styles.container} ${enabled ? styles.fadeIn : ""} ${hide ? styles.fadeOut : ""}`}>
            <span className={styles.content}>{text}</span>
            <div className={styles.image} style={{backgroundImage: `url(${image})`}}>&nbsp;</div>
        </div>
    );
}

export default Notification;
