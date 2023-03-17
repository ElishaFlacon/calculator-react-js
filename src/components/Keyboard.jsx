import React from 'react';
import CalcButton from './UI/button/CalcButton';


function Keyboard() {
    return (
        <div className="keyboard">
            <CalcButton>C</CalcButton>
            <CalcButton>(</CalcButton>
            <CalcButton>)</CalcButton>
            <CalcButton yellow="true">/</CalcButton>
            <CalcButton>7</CalcButton>
            <CalcButton>8</CalcButton>
            <CalcButton>9</CalcButton>
            <CalcButton yellow="true">x</CalcButton>
            <CalcButton>4</CalcButton>
            <CalcButton>5</CalcButton>
            <CalcButton>6</CalcButton>
            <CalcButton yellow="true">-</CalcButton>
            <CalcButton>1</CalcButton>
            <CalcButton>2</CalcButton>
            <CalcButton>3</CalcButton>
            <CalcButton yellow="true">+</CalcButton>
            <CalcButton big="true">0</CalcButton>
            <CalcButton>.</CalcButton>
            <CalcButton yellow="true">=</CalcButton>
        </div>
    )
}


export default Keyboard;