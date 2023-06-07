var operator = null;
var number = 0;
var result = null;
var lastkey = null;
let temp = null;
const display = document.getElementById("display");
const btnClear = document.getElementById("kAC");

document.addEventListener("keypress", (key) => {
  EnterNumber(key.key);
});

keysNumber = document.getElementsByClassName("key-number");
Array.from(keysNumber).forEach((key) => {
  key.onclick = (e) => {
    EnterNumber(e.target.value);
    SetClick(e.target.value);
  };
});

keysOperator = document.getElementsByClassName("key-operator");
Array.from(keysOperator).forEach((key) => {
  key.onclick = (e) => {
    EnterOperator(e.target.value);
    SetSelected(e.target.value);
    SetClick(e.target.value);
  };
});

keysControl = document.getElementsByClassName("key-control");
Array.from(keysControl).forEach((key) => {
  key.onclick = (e) => {
    EnterControl(e.target.value);
    SetClick(e.target.value);
  };
});

btnClear.onclick = () => {
  Clear("partial");
};

function PrintDisplay(data) {
  if (display.value.length < 9) {
    display.value = `${display.value}${data}`;
  }
  display.value = display.value.replace(/^(0+)/g, "");
  if (display.value.indexOf(".") == 0 || display.value.length == 0) {
    display.value = `0${display.value}`;
  }
}

function EnterNumber(num) {
  if (lastkey == "operator" || btnClear.innerText == "AC") {
    display.value = 0;
  }
  if (num == "." && display.value.indexOf(".") > -1) {
    return;
  }
  lastkey = "number";
  btnClear.innerText = "C";
  PrintDisplay(num);
  SetSelected("=");
}

function EnterOperator(ope) {
  if (ope == "%" || ope == "+/-") {
    SetResult(ope);
    return;
  }
  if ((lastkey == "number" && number) || ope == "%") {
    SetResult(operator);
  }
  number = new Decimal(display.value);
  lastkey = "operator";
  if (ope != "=") {
    operator = ope;
  } else {
    temp = number;
    Clear("all");
    PrintDisplay(temp);
  }
}

function EnterControl(con) {
  let result;
  switch (con) {
    case "%":
      if (operator == "+" || (operator == "-" && number)) {
        result = number.mul(Number(display.value)).div(100).toNumber();
      } else {
        var num = new Decimal(display.value);
        result = num.div(100).toNumber();
      }
      break;
    case "+/-":
      if (Number(display.value) !== 0) {
        if (display.value.indexOf("-") > -1) {
          result = display.value.replace(/^\-/g, "");
        } else {
          result = `-${display.value}`;
        }
      } else {
        result = display.value;
      }
      break;
    default:
      break;
  }
  display.value = result;
}

function SetResult(option) {
  let result;
  switch (option) {
    case "+":
      result = number.plus(display.value).toNumber();
      break;
    case "-":
      result = number.sub(display.value).toNumber();
      break;
    case "*":
      result = number.mul(display.value).toNumber();
      break;
    case "/":
      result = number.div(display.value).toNumber();
      break;
    default:
      break;
  }
  display.value = result;
}

function Clear(method) {
  if (method == "all") {
    btnClear.innerText = "AC";
    number = 0;
    lastkey = null;
    display.value = 0;
  }
  if (method == "partial" && btnClear.innerText == "AC") {
    Clear("all");
    SetSelected("=");
  } else if (method == "partial" && btnClear.innerText == "C") {
    display.value = "0";
    btnClear.innerText = "AC";
    if (operator) {
      SetSelected(operator);
    }
  }
}
function SetSelected(ope) {
  let k = document.getElementsByClassName("selected");
  if (k[0]) {
    k[0].classList.remove("selected");
  }
  if (ope !== "=") {
    document.getElementById(`k${ope}`).classList.add("selected");
  }
}
function SetClick(key) {
    document.getElementById(`k${key}`).classList.add("click");
    setTimeout(() => {
      document.getElementById(`k${key}`).classList.remove("click");
    }, 100);
}