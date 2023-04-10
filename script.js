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

let firstNum, secondNum, operator;

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

let displayedValue = 0;

function handleButtonClick(buttonValue) {
  if (buttonValue === Number) {
    displayedValue = appendNumberToDisplayedValue(displayedValue, buttonValue);
  } else {
    let currentValue = displayedValue;
    displayedValue = 0;
    let operator = buttonValue;
    return { currentValue, operator };
  }
}

function appendNumberToDisplayedValue(displayedValue, number) {
  if (displayedValue === 0) {
    return number.toString();
  } else {
    return displayedValue.toString() + number.toString();
  }
}
