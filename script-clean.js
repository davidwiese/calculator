let firstNum, secondNum, operator, lastInputValue;
let displayedValue = "";

const display = document.getElementById("display");
const pointButton = document.getElementById("btn-dot");

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
        return "NICE TRY";
      } else {
        result = firstNum / secondNum;
      }
      break;
    default:
      result = "ERROR";
  }
  const resultString = result.toString();
  const resultParts = resultString.split(".");
  let roundedResult;
  if (resultParts[0].length > 8) {
    roundedResult = "TOO LARGE";
  } else {
    const decimalDigits = (resultParts[1] || "").substring(0, 8);
    if (resultParts[0].length === 8 && !decimalDigits) {
      roundedResult = resultParts[0];
    } else {
      roundedResult = resultParts[0] + "." + decimalDigits;
    }
  }
  if (roundedResult.length > 8) {
    const decimalIndex = roundedResult.indexOf(".");
    if (decimalIndex === -1) {
      roundedResult = "TOO LARGE";
    } else {
      const wholePart = roundedResult.slice(0, decimalIndex);
      const decimalPart = roundedResult.slice(decimalIndex + 1, 9);
      roundedResult = `${wholePart}.${decimalPart}`;
    }
  }

  return roundedResult;
}

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
      if (operator && firstNum && lastInputValue) {
        secondNum = Number(lastInputValue);
        const result = operate(operator, firstNum, secondNum);
        if (result > 99999999) {
          display.textContent = "TOO LARGE";
        } else {
          display.textContent = result;
          displayedValue = result.toString();
        }
        operator = null;
        firstNum = null;
        secondNum = null;
        lastInputValue = null;
      }
    } else {
      if (buttonValue === "." && displayedValue.includes(".")) {
        return;
      }
      if (displayedValue.length < 8) {
        displayedValue += buttonValue;
        if (Number(displayedValue) > 99999999) {
          display.textContent = "TOO LARGE";
        } else {
          display.textContent = displayedValue;
        }
        lastInputValue = displayedValue;
      } else {
        display.textContent = displayedValue;
      }
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const shiftKeyPressed = event.shiftKey;
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
  if (keyMap[key]) {
    const button = document.getElementById(keyMap[key]);
    if (key === "8" && shiftKeyPressed) {
      const multiplyButton = document.getElementById("btn-multiply");
      multiplyButton.click();
    } else {
      button.click();
    }
  }
});
