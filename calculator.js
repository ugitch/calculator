let buffer = "0";
let runningTotal = 0;
let operator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleDigit(value);
  }
  render();
}

function handleDigit(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch(value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      operator = null;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (operator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      operator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);

  if (intBuffer === 0) {
    return;
  }

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  operator = value;
  buffer = "0";
}

function flushOperation(value) {
  if (operator === "+") {
    runningTotal += value;
  } else if (operator === "-") {
    runningTotal -= value;
  } else if (operator === "×") {
    runningTotal *= value;
  } else {
    runningTotal /= value;
  }
}

function render() {
  screen.innerText = buffer;
}

function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();
