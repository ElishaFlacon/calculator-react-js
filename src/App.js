import { useState } from "react";
import './styles/App.css';
import Keyboard from "./components/Keyboard";
import CalcForm from "./components/UI/form/CalcForm";


function App() {

    const [input, setInput] = useState('0');
    const [inputInfo, setInputInfo] = useState('0');


    const buttonClick = (event) => {
        // эта фигня нужна чтобы при нажатии на промежуток 
        // между циферками, у нас не вводилось это значение
        if (event.target.textContent === 'C()/789x456-123+0.=') {
            return;
        }

        if (event.target.textContent === 'C') {
            clearInput();
            return;
        }

        if (event.target.textContent === '=') {
            const refreshInput = refresh(input);
            calculate(refreshInput);
            return;
        }

        if (input === '0') {
            setInput(event.target.textContent);
            return;
        }

        setInput(input + event.target.textContent);
    }


    // чистим ввод
    const clearInput = () => {
        setInput('0');
        setInputInfo('0');
    }


    // после того как посчитали 2 числа, мы должны их стереть
    // и вставить на это место полученное значение
    const updateArray = (nums, idx, count) => {
        nums.splice(idx, 1);
        nums.splice(idx - 1, 1);
        nums.splice(idx - 1, 1);
        nums.splice(idx - 1, 0, count);
    }


    // считаем
    const calculate = (nums) => {
        let count = 0

        while (nums.indexOf('(') !== -1) {
            const openBracket = nums.lastIndexOf('(');
            const closeBracket = nums.indexOf(')');

            // проверки на то что есть не закрытая скобка
            if (openBracket > closeBracket) {
                setInputInfo('Ошибка!');
                return;
            }
            if (closeBracket === -1) {
                setInputInfo('Ошибка!');
                return;
            }

            count = parenthesis(nums);

            nums.splice(openBracket, closeBracket - openBracket + 1, count);
        }

        while (nums.indexOf('x') !== -1) {
            const idx = nums.indexOf('x');
            count = multiplier(nums);

            updateArray(nums, idx, count);
        }
        while (nums.indexOf('/') !== -1) {
            const idx = nums.indexOf('/');
            count = division(nums);

            updateArray(nums, idx, count);
        }
        while (nums.indexOf('+') !== -1 || nums.indexOf('-') !== -1) {
            if (nums.indexOf('+') < nums.indexOf('-') && nums.indexOf('+') !== -1 && nums.indexOf('-') !== -1) {
                const idx = nums.indexOf('+');
                count = plus(nums);

                updateArray(nums, idx, count);
            }
            else if (nums.indexOf('+') !== -1 && nums.indexOf('-') === -1) {
                const idx = nums.indexOf('+');
                count = plus(nums);

                updateArray(nums, idx, count);
            }
            else if (nums.indexOf('-') !== -1) {
                const idx = nums.indexOf('-');
                count = minus(nums);

                updateArray(nums, idx, count);
            }
        }

        setInputInfo(String(count));
        setInput(String(count));
        // clearInput();

        return count;
    }


    // тут мы добовляем пробелы в строку
    //  и превращаем в массив
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
                case '(':
                    output += '( ';
                    nums.splice(0, 1);
                    break;
                case ')':
                    output += ' )';
                    nums.splice(0, 1);
                    break;
                default:
                    output += nums[0];
                    nums.splice(0, 1);
            }
        }

        return output.split(" ");
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


    // считаем выражение внутри скобки
    const parenthesis = (nums) => {
        const openBracket = nums.lastIndexOf('(');
        const closeBracket = nums.indexOf(')');

        const bracketNums = nums.slice(openBracket + 1, closeBracket);

        const count = calculate(bracketNums);

        return (count);
    }


    return (
        <div className="app">
            <h1>
                МЕГАКАЛЬКУЛЯТОР 2.0
            </h1>

            <CalcForm>
                {input}
                {inputInfo}
            </CalcForm>

            <div onClick={(e) => buttonClick(e)}>
                <Keyboard />
            </div>
        </div>
    );
}

export default App;
