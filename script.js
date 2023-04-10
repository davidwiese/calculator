//Global variables
let firstNum, secondNum, operator, lastInputValue;
let displayedValue = "";

//DOM elements
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btn0 = document.getElementById("btn-0");
const btnAdd = document.getElementById("btn-add");
const btnSubtract = document.getElementById("btn-subtract");
const btnDivide = document.getElementById("btn-divide");
const btnMultiply = document.getElementById("btn-multiply");
const btnEquals = document.getElementById("btn-equals");
const btnDot = document.getElementById("btn-dot");
const btnClear = document.getElementById("btn-clear");
const display = document.getElementById("display");

//Functions
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function clearDisplay() {
  display.textContent = "";
  displayedValue = "";
  firstNum = null;
  secondNum = null;
  operator = null;
  lastInputValue = null;
}

function operate(operator, firstNum, secondNum) {
  if (operator === "+") {
    return add(firstNum, secondNum);
  } else if (operator === "-") {
    return subtract(firstNum, secondNum);
  } else if (operator === "*") {
    return multiply(firstNum, secondNum);
  } else if (operator === "/") {
    return divide(firstNum, secondNum);
  } else {
    return "ERROR";
  }
}

//Event listeners
document.getElementById("btn-clear").addEventListener("click", clearDisplay);
const buttons = document.querySelectorAll(".calc-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    if (
      buttonValue === "+" ||
      buttonValue === "-" ||
      buttonValue === "*" ||
      buttonValue === "/"
    ) {
      if (operator && firstNum) {
        secondNum = Number(displayedValue);
        const result = operate(operator, firstNum, secondNum);
        display.textContent = result;
        firstNum = result;
        displayedValue = "";
      }
      operator = buttonValue;
      if (!firstNum) {
        firstNum = Number(displayedValue);
        displayedValue = "";
      }
      lastInputValue = null;
    } else if (buttonValue === "=") {
      if (lastInputValue) {
        secondNum = Number(lastInputValue);
        const result = operate(operator, firstNum, secondNum);
        display.textContent = result;
        displayedValue = result.toString();
        operator = null;
        firstNum = null;
        secondNum = null;
        lastInputValue = null;
      }
    } else {
      displayedValue += buttonValue;
      display.textContent = displayedValue;
      lastInputValue = displayedValue;
    }
  });
});
