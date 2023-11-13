const displayMiddleElmnt = document.querySelector(".display-m");   
const displaytElmnt = document.querySelector(".display-t");
const tempResultbtn = document.querySelector(".temp-btm");
const numbersElmnt = document.querySelectorAll(".number");  
const operationElmnt = document.querySelectorAll(".operation");  
const EqualElmnt = document.querySelector(".equal");   
const clearAllElmnt = document.querySelector(".clear-C");   
const clearACElmnt = document.querySelector(".clear-AC"); 


let dispTopNum = "";   
let dispBtmNum = ""; 
let result = null;
let lastOperation = "";
let haveDot = false;

numbersElmnt.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dispBtmNum += e.target.innerText;
    displayMiddleElmnt.innerText = dispBtmNum;

  });
});

operationElmnt.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dispBtmNum) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dispTopNum && dispBtmNum && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dispBtmNum);
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});
function clearVar(name = "") {
  dispTopNum += dispBtmNum + " " + name + " ";
  displaytElmnt.innerText = dispTopNum;
  displayMiddleElmnt.innerText = "";
  dispBtmNum = "";
  tempResultbtn.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dispBtmNum);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dispBtmNum);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dispBtmNum);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dispBtmNum);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dispBtmNum);
  }
}




EqualElmnt.addEventListener("click", () => {
  if (!dispBtmNum || !dispTopNum) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayMiddleElmnt.innerText = result;
  tempResultbtn.innerText = "";
  dispBtmNum = result;
  dispTopNum = "";
});

clearAllElmnt.addEventListener("click", () => {
  dispTopNum = "";
  dispBtmNum = "";
  displaytElmnt.innerText = "";
  displayMiddleElmnt.innerText = "";
  result = "";
  tempResultbtn.innerText = "";
});

clearACElmnt.addEventListener("click", () => {
  displayMiddleElmnt.innerText = "";
  dispBtmNum = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);

  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");

  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }

});
function clickButtonEl(key) {
  numbersElmnt.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationElmnt.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  EqualElmnt.click();
}
