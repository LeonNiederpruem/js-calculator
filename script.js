const allButtons = document.getElementsByTagName("button");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const inputNumberField = document.querySelector(".inputNumber");
const saveInput = document.querySelector(".saveInput");

const regex = /\d/gm;

let currentNumber = inputNumberField.innerHTML;

let inputNumber1 = undefined;
let inputNumber2 = undefined;
let selectedOperator = undefined;

document.body.onkeydown = (e) => {
  switch (e.key) {
    case "+":
      setOperator("+");
      break;
    case "-":
      setOperator("-");
      break;
    case "*":
      setOperator("*");
      break;
    case "/":
      setOperator("/");
      break;
    case "Enter":
      doMath();
      break;
  }

  if (e.key == "Backspace") {
    deleteNumber();
  } else if (e.key.toLowerCase() == "c") {
    clearAll();
  } else if (e.key == ",") {
    checkInput(e.key);
  } else if (isNumber(e.key)) {
    checkInput(e.key);
  }
};

numberButtons.forEach((button) => {
  button.onclick = () => {
    checkInput(button.innerText);
  };
});

operationButtons.forEach((button) => {
  button.onclick = () => {
    switch (button.innerText) {
      case "+":
        setOperator("+");
        break;
      case "-":
        setOperator("-");
        break;
      case "⨉":
        setOperator("*");
        break;
      case "÷":
        setOperator("/");
        break;
    }
  };
});

clearButton.onclick = () => {
  clearAll();
};

deleteButton.onclick = () => {
  deleteNumber();
};

const checkInput = (input) => {
  if (inputNumberField.innerText == 0 && input == 0) {
    return;
  } else if (inputNumberField.innerText.includes(",") && input == ",") {
    return;
  } else if (inputNumberField.innerText == 0 && input != 0) {
    updateDisplay(input);
  } else if (inputNumberField.innerText == 0 && input == ",") {
    updateDisplay(input);
  } else {
    updateDisplay(input);
  }
};

const updateDisplay = (input) => {
  if (inputNumberField.innerText == 0 && input == ",") {
    appendNumber(input);
  } else if (inputNumberField.innerText == 0 && input != 0) {
    replaceNumber(input);
  } else {
    appendNumber(input);
  }
};

const appendNumber = (input) => {
  inputNumberField.innerText += input;
  setCurrentNumber();
};

const replaceNumber = (input) => {
  inputNumberField.innerText = input;
  setCurrentNumber();
};

const setOperator = (operator) => {
  selectedOperator = operator;
  updateSaveInput();
};

const updateSaveInput = () => {
  saveInput.innerText = inputNumberField.innerText + selectedOperator;
  inputNumberField.innerText = 0;
};

//temp name
const doMath = () => {
  console.log('test')
  calculation = (saveInput.innerText, inputNumberField.innerText);

  inputNumberField.innerText = calculation;

  console.log(calculation)
};

const setCurrentNumber = () => {
  currentNumber = inputNumberField.innerText;
  console.log(currentNumber);
};

const clearAll = () => {
  inputNumberField.innerText = 0;
  saveInput.innerText = 0;
  inputNumber1 == undefined;
  inputNumber2 == undefined;
  selectedOperator == undefined;
};

const deleteNumber = () => {
  inputNumberField.innerText = inputNumberField.innerText.slice(0, -1);
  if (inputNumberField.innerText.length == 0) {
    inputNumberField.innerText = 0;
  }
};

const isNumber = (input) => {
  if (input.match(regex)) {
    return true;
  }
};
