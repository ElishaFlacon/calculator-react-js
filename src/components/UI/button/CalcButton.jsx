import React from 'react';
import classes from './CalcButton.module.css';


function CalcButton(props) {

    return (
        <button className={`
        ${classes.keyborad__button} 
        ${props.yellow === "true" ? classes.yellow : ""}
        ${props.big === "true" ? classes.bigButton : ""} 
        `}>
            {props.children}
        </button >
    )
}


export default CalcButton;