import './App.css';
import { useState } from "react";


function App() {

    const [input, setInput] = useState('0');
    const [inputInfo, setInputInfo] = useState('0');


    const buttonClick = (event) => {
        if (event.target.textContent === 'C()/789x456-123+0%.=') {
            return;
        }
        if (event.target.textContent === 'C') {
            clearInput();
            return;
        }
        if (event.target.textContent === '=') {
            calculate(input);
            return;
        }
        if (input === '0') {
            setInput(event.target.textContent);
            return;
        }
        if (input[input.length - 1] !== ['+', '-', 'x', '/']) {
            setInput(input + event.target.textContent);
            return;
        }
        setInput(input + " " + event.target.textContent);
    }


    const clearInput = () => {
        setInput('0');
        // setInputInfo('0');
    }


    // тут повторяется кусок кода с нумсами, сделай отдельную функцию!

    const calculate = (nums) => {
        let count = 0;
        nums = refresh(nums).split(" ");
        console.log(nums);
        while (nums.indexOf('x') !== -1) {
            const idx = nums.indexOf('x');
            count = multiplier(nums);
            nums.splice(idx, 1);
            nums.splice(idx - 1, 1);
            nums.splice(idx - 1, 1);
            nums.splice(idx - 1, 0, count);
        }
        while (nums.indexOf('/') !== -1) {
            const idx = nums.indexOf('/');
            count = division(nums);
            nums.splice(idx, 1);
            nums.splice(idx - 1, 1);
            nums.splice(idx - 1, 1);
            nums.splice(idx - 1, 0, count);
        }
        while (nums.indexOf('+') !== -1 || nums.indexOf('-') !== -1) {
            if (nums.indexOf('+') < nums.indexOf('-') && nums.indexOf('+') !== -1 && nums.indexOf('-') !== -1) {
                const idx = nums.indexOf('+');
                count = plus(nums);
                nums.splice(idx, 1);
                nums.splice(idx - 1, 1);
                nums.splice(idx - 1, 1);
                nums.splice(idx - 1, 0, count);
            } else if (nums.indexOf('+') !== -1 && nums.indexOf('-') === -1) {
                const idx = nums.indexOf('+');
                count = plus(nums);
                nums.splice(idx, 1);
                nums.splice(idx - 1, 1);
                nums.splice(idx - 1, 1);
                nums.splice(idx - 1, 0, count);
            } else if (nums.indexOf('-') !== -1) {
                const idx = nums.indexOf('-');
                count = minus(nums);
                nums.splice(idx, 1);
                nums.splice(idx - 1, 1);
                nums.splice(idx - 1, 1);
                nums.splice(idx - 1, 0, count);
            }
        }
        console.log(count);
        setInputInfo(String(count));
        clearInput();
        return count;
    }

    // тут мы добовляем пробелы в строку
    const refresh = (nums) => {
        let output = '';
        nums = nums.split('');
        while (nums.length) {
            switch (nums[0]) {
                case 'x':
                    output += ' x ';
                    nums.splice(0, 1);
                    break;
                case '/':
                    output += ' / ';
                    nums.splice(0, 1);
                    break;
                case '-':
                    output += ' - ';
                    nums.splice(0, 1);
                    break;
                case '+':
                    output += ' + ';
                    nums.splice(0, 1);
                    break;
                default:
                    output += nums[0];
                    nums.splice(0, 1);
            }
        }
        return output;
    }

    const multiplier = (nums) => {
        const idx = nums.indexOf('x');
        const count = Number(nums[idx - 1]) * Number(nums[idx + 1]);
        return (count);
    }


    const division = (nums) => {
        const idx = nums.indexOf('/');
        const count = Number(nums[idx - 1]) / Number(nums[idx + 1]);
        return (count);
    }

    const plus = (nums) => {
        const idx = nums.indexOf('+');
        const count = Number(nums[idx - 1]) + Number(nums[idx + 1]);
        return (count);
    }

    const minus = (nums) => {
        const idx = nums.indexOf('-');
        const count = Number(nums[idx - 1]) - Number(nums[idx + 1]);
        return (count);
    }


    return (
        <div className="app">
            <h1>
                МЕГАКАЛЬКУЛЯТОР v1.5
            </h1>
            <div className="app__input-form">
                <form className="form" action="number">
                    <div className="form__input-space">
                        <div className="form__info">
                            {inputInfo}
                        </div>
                        <div className="form__input" onClick={() => refresh("10-4+9x8/9-10-999/2x5")}>
                            {input}
                        </div>
                    </div>
                </form>
                <div className="app__keyboard">
                    <div className="keyboard" onClick={(e) => buttonClick(e)}>
                        <button className="keyborad__button clear">C</button>
                        <button className="keyborad__button dont-working">(</button>
                        <button className="keyborad__button dont-working">)</button>
                        <button className="keyborad__button yellow">/</button>
                        <button className="keyborad__button">7</button>
                        <button className="keyborad__button">8</button>
                        <button className="keyborad__button">9</button>
                        <button className="keyborad__button yellow">x</button>
                        <button className="keyborad__button">4</button>
                        <button className="keyborad__button">5</button>
                        <button className="keyborad__button">6</button>
                        <button className="keyborad__button yellow">-</button>
                        <button className="keyborad__button">1</button>
                        <button className="keyborad__button">2</button>
                        <button className="keyborad__button">3</button>
                        <button className="keyborad__button yellow">+</button>
                        <button className="keyborad__button">0</button>
                        <button className="keyborad__button dont-working">%</button>
                        <button className="keyborad__button">.</button>
                        <button className="keyborad__button yellow">=</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
