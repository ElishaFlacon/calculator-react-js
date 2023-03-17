import React from 'react';
import classes from './CalcForm.module.css';

function CalcForm(props) {
    return (
        <form className={classes.form}>
            <div className={classes.form__container}>
                <div className={classes.form__info}>
                    {props.children[1]}
                </div>
                <div className={classes.form__input}>
                    {props.children[0]}
                </div>
            </div>
        </form>
    );
}

export default CalcForm;