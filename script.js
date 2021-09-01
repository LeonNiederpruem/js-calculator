const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const plusminus = document.querySelector("[data-plusminus]");
const inputNumberField = document.querySelector(".inputNumber");
const bottomInput = document.querySelector(".bottomInput");

inputOperator = undefined;
savedInputNumber = undefined;
currentNumber = 0;
resultNumber = undefined;

document.body.onkeypress = (e) => {
  if (isDigit(e.key)) {
    checkInput(e.key);
  }
  debugLog();
};

document.body.onkeydown = (e) => {
  // console.log(e.key.toLowerCase())
  switch (e.key.toLowerCase()) {
    case "enter":
      calculate();
      break;
    case "backspace":
      deleteNumber();
      break;
    case "c":
      clearAll();
      break;
    case '.':
      checkInput('.')
    break;
  }
  debugLog();
};

deleteButton.onclick = () => {
  deleteNumber();
  debugLog();
};

clearButton.onclick = () => {
  clearAll();
};

equalsButton.onclick = () => {
  calculate();
};

plusminus.onclick = () => {
  debugLog();
};

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
    debugLog();
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    setOperator(button);
  };
});

const checkInput = (input) => {
  if (input == ".") {
    return checkComma(input);
  }

  if (savedInputNumber == currentNumber) {
    replaceNumber(input);
  } else if (inputNumberField.innerText == resultNumber) {
    replaceNumber(input);
  } else {
    if (inputNumberField.innerText == '0' && input == 0) {
      return;
    } else if (inputNumberField.innerText == '0' && input != 0) {
      replaceNumber(input);
    } else {
      appendNumber(input);
    }
  }
  currentNumber = inputNumberField.innerText;
};

checkComma = (input) => {
  if (inputNumberField.innerText.includes(".") && input == ".") {
    return;
  } else {
    appendNumber(input);
  }
};

const calculate = () => {
  switch (inputOperator) {
    case "+":
      inputNumberField.innerText = calcAddition(
        savedInputNumber,
        currentNumber
      );
      break;
    case "-":
      inputNumberField.innerText = calcSubtraction(
        savedInputNumber,
        currentNumber
      );
      break;
    case "⨉":
      inputNumberField.innerText = calcMultiplication(
        savedInputNumber,
        currentNumber
      );
      break;
    case "÷":
      inputNumberField.innerText = calcDivision(
        savedInputNumber,
        currentNumber
      );
      break;
  }
  resultNumber = inputNumberField.innerText;
  removeActiveStyle();
};

const setOperator = (button) => {
  savedInputNumber = inputNumberField.innerText;
  inputOperator = button.innerText;
  setActiveStyle(button);
};

const setActiveStyle = (button) => {
  removeActiveStyle();
  button.classList.add("active");
};

const removeActiveStyle = () => {
  operationButtons.forEach((operationButton) => {
    operationButton.classList.remove("active");
  });
};

const appendNumber = (input) => {
  inputNumberField.innerText += input;
  currentNumber = inputNumberField.innerText;
};

const replaceNumber = (input) => {
  inputNumberField.innerText = input;
  currentNumber = inputNumberField.innerText;
};

const calcAddition = (num1, num2) => {
  return parseFloat(num1) + parseFloat(num2);
};

const calcSubtraction = (num1, num2) => {
  return parseFloat(num1) - parseFloat(num2);
};

const calcMultiplication = (num1, num2) => {
  return parseFloat(num1) * parseFloat(num2);
};

const calcDivision = (num1, num2) => {
  return parseFloat(num1) / parseFloat(num2);
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
  currentNumber = inputNumberField.innerText;
};

const clearAll = () => {
  removeActiveStyle();
  inputNumberField.innerText = 0;
  inputOperator = undefined;
  savedInputNumber = undefined;
  currentNumber = undefined;
  resultNumber = undefined;
};

const isDigit = (input) => {
  return /\d/.test(input);
};

const debugLog = () => {
  console.log("savedInputNumber", savedInputNumber);
  console.log("currentNumber", currentNumber);
  console.log("resultNumber", resultNumber);
  console.log("–––––––––––––––––––––––––––––––––");
};
