let buffer = "0";
let accum = 0;
let operator = null;
let resetBuffer = false;

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
  } else if (resetBuffer) {
    resetBuffer = false;
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch(value) {
    case "C":
      buffer = "0";
      accum = 0;
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
      resetBuffer = true;
      operator = null;
      buffer = "" + accum;
      accum = 0;
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

  if (accum === 0) {
    accum = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  buffer = "0";
  operator = value;
}

function flushOperation(value) {
  if (operator === "+") {
    accum += value;
  } else if (operator === "-") {
    accum -= value;
  } else if (operator === "×") {
    accum *= value;
  } else {
    accum /= value;
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
