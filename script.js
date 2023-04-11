//Global variables
let firstNum, secondNum, operator, lastInputValue;
let displayedValue = "";

//DOM elements
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
    // If the button is an operator
    if (
      buttonValue === "+" ||
      buttonValue === "-" ||
      buttonValue === "*" ||
      buttonValue === "/"
    ) {
      // Checks to see if both the operator and firstNum variables are set
      // If they are, it means the user has already entered a first number, operator,
      // and second number, and the code needs to calculate the result of the previous
      // operation before setting the operator variable to the new operator value
      if (operator && firstNum) {
        // Sets the secondNum variable to the current value of displayedValue
        secondNum = Number(displayedValue);
        // Calls the operate() function with the current operator, firstNum, and secondNum
        const result = operate(operator, firstNum, secondNum);
        // Sets the result as the new value of firstNum. The displayedValue variable is reset
        display.textContent = result;
        firstNum = result;
        displayedValue = "";
      }
      operator = buttonValue;
      // If the operator variable has not been set yet, it means the user has just entered
      // the first number, so the code sets the firstNum variable to the current value of
      // displayedValue and resets the displayedValue variable to an empty string
      if (!firstNum) {
        firstNum = Number(displayedValue);
        displayedValue = "";
      }
      lastInputValue = null;
      // If the button is "=", code checks to see if  operator, firstNum, and lastInputValue
      // are set. If so, it means the user has entered both a first and second number and
      // an operator, and the code needs to calculate the result of the operation
    } else if (buttonValue === "=") {
      if (operator && firstNum && lastInputValue) {
        // Set the secondNum variable to the current value of lastInputValue
        secondNum = Number(lastInputValue);
        // Call operate() function with the current operator, firstNum, and secondNum values
        const result = operate(operator, firstNum, secondNum);
        // Set the result as the new value of displayedValue
        display.textContent = result;
        // displayedValue variable is then converted to a string and set as the text content
        displayedValue = result.toString();
        operator = null;
        firstNum = null;
        secondNum = null;
        lastInputValue = null;
      }
    } else {
      // If the button is not an operator or the equals sign, then it must be a digit
      // The digit value is appended to the displayedValue variable, and the text
      // content of the display element is updated to show the new value
      displayedValue += buttonValue;
      display.textContent = displayedValue;
      // lastInputValue variable is set to the current value of displayedValue,
      // so that the code can keep track of the second number entered by the user
      lastInputValue = displayedValue;
    }
  });
});
