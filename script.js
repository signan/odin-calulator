const currentScreen = document.querySelector('.display > h1')
const fullScreen = document.querySelector('.display > h3')
let num1 = '';
let num2 = '';
let result = ''
let operator = '';

const numberButtons = document.querySelectorAll(".btn.num");
const operatorButtons = document.querySelectorAll(".btn.op");
const clearButton = document.getElementById("btn-clear");
const deleteButton = document.querySelectorAll("btn-delete");
const equalsButton = document.querySelectorAll("btn-equals");
const pointButton = document.querySelectorAll("btn-point");
console.log(operatorButtons);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);
numberButtons.forEach((button) => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorButtons.forEach((button) => button.addEventListener('click', () => setOpertaion(button.textContent)));





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

function appendNumber() {
    if (result) {
        clear();
        result = null;
    }
    displayText = displayText + event.currentTarget.textContent;
    currentNumber = currentNumber + event.currentTarget.textContent;
    console.log(displayText)
    updateScreen();
}

function setOperation() {
    if (endsWithOperation()) {
        console.log('del')

        deleteNumber();
    }

    if (displayText === '' & event.currentTarget.textContent != '-') {
        return;
    }

    if (displayText === '') {
        if (event.currentTarget.textContent === '-') {
            if (currentNumber.startsWith('-')) {
                return;
            }
            displayText = displayText + event.currentTarget.textContent;
            currentNumber = currentNumber + event.currentTarget.textContent;
            updateScreen();
            return;
        }
        return;
    }

    if(operator != '') {
        evaluate()
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
    updateScreen();
}

function evaluate() {
    if (operator === '') {
        return;
    }
    if (num2 === '') {
        num2 = currentNumber;
        currentNumber = '';
    }
    result = operate(parseInt(num1), parseInt(num2), operator)
    console.log(`num1 ${num1} num2 ${num2} operator ${operator} result:${result}`)
    num1 = result;
    num2 ='';
    operator = '';
    displayText = String(result);
    updateScreen();

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


function clear() {
    currentNumber = '';
    num1 = '';
    num2 = '';
    displayText = '';
    updateScreen();
}

function deleteNumber() {
    displayText = displayText.slice(0, -1);
    updateScreen();
}

function updateScreen() {
    display.textContent = displayText;
}


wireButtons();
