const currentScreen = document.querySelector('.screen > h1')
const fullScreen = document.querySelector('.screen > h3')
let num1 = '';
let num2 = '';
let result = ''
let currentOperator = '';
let shouldClear = false;


const numberButtons = document.querySelectorAll(".btn.num");
const operatorButtons = document.querySelectorAll(".btn.op");
const clearButton = document.getElementById("btn-clear");
const deleteButton = document.getElementById("btn-delete");
const equalsButton = document.getElementById("btn-equals");
const pointButton = document.getElementById("btn-point");
console.log(operatorButtons);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', reset);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);
numberButtons.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener('click', () => setOperation(button.textContent)));





function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    // convert a and b to integers
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function appendNumber(number) {
    if (currentScreen.textContent === '0' || shouldClear) {
        clearCurrentScreen();
        shouldClear = false;
    }
    currentScreen.textContent += number;
}

function setOperation(operator) {
    // changes the previous operator if any exists
    if (endsWithOperation()) {
        fullScreen.textContent = fullScreen.textContent.slice(0, -1);
    }

    if(num1 != '' && currentOperator) {
        evaluate();
    }

    num1 = currentScreen.textContent;
    fullScreen.textContent = currentScreen.textContent + operator;
    currentOperator = operator;
    shouldClear = true;
}

function appendPoint() {
    if (currentScreen.textContent.includes('.')) {
        return;
    }
    currentScreen.textContent += '.';
}

function evaluate() {
    console.log('test')
    if (currentOperator === '') {
        console.log('no operator')

        return;
    }
    if (num2 === '') {
        num2 = currentScreen.textContent;
    }
    
    fullScreen.textContent += num2;

    num1 = Number(num1);
    num2 = Number(num2);

    result = operate(num1, num2, currentOperator);
    console.log(`num1 ${num1} num2 ${num2} operator ${currentOperator} result:${result}`);
    fullScreen.textContent += '='
    currentScreen.textContent = result;
    num1 = result;
    num2 ='';
    currentOperator = '';
}

function endsWithOperation() {
    let operations = ['+', '-', '*', '/']
    return operations.some((operator) => {
        return fullScreen.textContent.endsWith(operator)
    })
}

function clearCurrentScreen() {
    currentScreen.textContent = '';
}

function deleteNumber() {
    if (currentScreen.textContent === '0') {
        return;
    }
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
}

function reset() {
    fullScreen.textContent = ''
    currentScreen.textContent = '0';
    num1 = '';
    num2 = '';
    result = ''
    currentOperator = '';
    shouldClear = false;
}
