let displayText = '';
const display = document.querySelector('.display > h1')



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
    updateDisplay();
}

function addOperation() {
    if (endsWithOperation()) {
        del();
    }
    displayText = displayText + event.currentTarget.textContent;
    updateDisplay();
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
    displayText = ''
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
