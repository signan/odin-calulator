let displayText = '';
const display = document.querySelector('.display > h1')
let currentNumber = '';
let num1 = '';
let num2 = '';
let result = ''
let operator = '';


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
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            console.log('not a number');
    }
}

function wireButtons() {
    let buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        let btnClasses = btn.classList;
        if (btnClasses.contains('op')) {
            btn.addEventListener('click', addOperation);
        }
        else if (btn.classList.contains('eq')) {
            btn.addEventListener('click', calculate);
        }
        else if (btnClasses.contains('clr')) {
            btn.addEventListener('click', clearDisplay);
        }
        else if (btnClasses.contains('del')) {
            btn.addEventListener('click', del);
        }
        else {
            btn.addEventListener('click', addDigit);
        }
    });
}

function addDigit() {
    displayText = displayText + event.currentTarget.textContent;
    currentNumber = currentNumber + event.currentTarget.textContent;
    console.log(currentNumber)
    updateDisplay();
}

function addOperation() {
    if (endsWithOperation()) {
        del();
    }

    if (num1 === '') {
        num1 = currentNumber;
        currentNumber = '';
    }
    else if (num2 === '') {
        num2 = currentNumber;
        currentNumber = '';
    }

    operator = event.currentTarget.textContent;
    displayText = displayText + operator;
    updateDisplay();
}

function calculate() {
    if (num2 === '') {
        num2 = currentNumber;
        currentNumber = '';
    }
    result = operate(parseInt(num1), parseInt(num2), operator)
    console.log(`num1 ${num1} num2 ${num2} operator ${operator} result:${result}`)
    num1 = result;
    num2 ='';

}

function addNumber(number) {
    if (num1 === '') {
        num1 = currentNumber;
        currentNumber = '';
    }
    else if (num2 === '') {
        num2 = currentNumber;
        currentNumber = '';
    }

}

function endsWithOperation() {
    let operations = ['+', '-', '*', '/']
    for (let operation of operations) {
        if(displayText.endsWith(operation))
            return true;
    }
    return false;
}


function clearDisplay() {
    currentNumber = '';
    num1 = '';
    num2 = '';
    displayText = '';
    updateDisplay();
}

function del() {
    displayText = displayText.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.textContent = displayText;
}


wireButtons();
