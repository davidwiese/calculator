//Global variables
let firstNum, secondNum, operator, lastInputValue;
let displayedValue = "";

//DOM elements
const display = document.getElementById("display");
const pointButton = document.getElementById("btn-dot");

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
  switch (operator) {
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    case "/":
      if (secondNum === 0) {
        operator = null;
        firstNum = null;
        secondNum = null;
        displayedValue = "";
        lastInputValue = null;
        return "Nice try. Can't divide by zero.";
      } else {
        result = firstNum / secondNum;
      }
      break;
    default:
      result = "ERROR";
  }
  return Number(result.toFixed(8)); // limit total number of digits to 8 on either side of the decimal point
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
      // Check to see if the button is a decimal point and if displayedValue already
      // includes a decimal point. If so, return and do nothing (max 1 decimal)
      if (buttonValue === "." && displayedValue.includes(".")) {
        return;
      }
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

// Add event listener to the document for keyboard input
document.addEventListener("keydown", (event) => {
  // Get the key code of the pressed key
  const key = event.key;
  // Check if the Shift key is pressed
  const shiftKeyPressed = event.shiftKey;
  // Define a mapping of key codes to button ids
  const keyMap = {
    "/": "btn-divide",
    "*": "btn-multiply",
    "-": "btn-subtract",
    "+": "btn-add",
    0: "btn-0",
    1: "btn-1",
    2: "btn-2",
    3: "btn-3",
    4: "btn-4",
    5: "btn-5",
    6: "btn-6",
    7: "btn-7",
    8: "btn-8",
    9: "btn-9",
    ".": "btn-dot",
    Enter: "btn-equals",
    Escape: "btn-clear",
  };
  // If the pressed key has a corresponding button, trigger the button click
  if (keyMap[key]) {
    const button = document.getElementById(keyMap[key]);
    if (key === "8" && shiftKeyPressed) {
      // If the pressed key is the number 8 and the Shift key is pressed, trigger the multiply button
      const multiplyButton = document.getElementById("btn-multiply");
      multiplyButton.click();
    } else {
      button.click();
    }
  }
});
