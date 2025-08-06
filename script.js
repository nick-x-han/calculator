// const math = require('mathjs');

function operate(a, b, operation) {
    if (getOperation(operation) == "/" && (a == '0' || b == '0')) {
        alert("Don't do that.");
        clear();
        return;
    }
    return math.evaluate(`${a} ${getOperation(operation)} ${b}`);
}

const input = document.querySelector(".input");
const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");
const final = document.querySelector(".bottom");
const container = document.querySelector(".container");

//use sequence to store nums + operation (convert that operation to evaluation of previous two nums after next operation)
let sequence = [];
let ongoing = true;

function getNormalDigits(num) {
    return num.split().slice(0, num.indexOf('.'));
}

function getDecimalDigits(num) {
    return num.split().slice(num.indexOf('.'));
}

// function disableNumbers() {

// }

// function display(text) {
//     if (getDecimalDigits(text) >= 4) {
//         text = Number(text).toFixed(4);
//     }
//     if (getNormalDigits(text) >= 6) {
//         disableNumbers();
//     }
//     input.textContent = text;
// }

function clear(fullClear = true) {
    if (fullClear) {
        sequence = [];
        ongoing = false;
        input.classList.remove("remove");
    }

    input.textContent = "";
    dot.classList.remove("disabled");
}

function isOperation(op) {
    if (op == "\u2013" || op == "\u00D7" || op == "+" || op == "\u00F7") return true

    return false;
}

function getOperation(op) {
    if (op == "\u2013") return '-';
    if (op == "\u00D7") return '*';
    if (op == "+") return "+";
    if (op == "\u00F7") return '/';
}

function handleOperationInput(e) {
    let currentOperation = e.target.textContent;
    let text = input.textContent;
    dot.classList.remove("disabled");
    //if one of the four operations is clicked
    if (ongoing && text.length > 0 && isOperation(currentOperation)) {
        //deals with situation where user spams operation
        if (input.classList.contains("remove")) {
            sequence[sequence.length - 1] = currentOperation
            return;
        }
        //this is a flag indicating that current input should be removed on next input / has been accounted for
        input.classList.add("remove");

        //if this isn't the first operation press
        if (sequence.length !== 0) {
            let previousResult = operate(sequence[0], text, sequence[1]);
            input.textContent = previousResult;
            sequence[0] = previousResult;
            sequence[1] = currentOperation;
        }
        else {
            sequence.push(text);
            sequence.push(currentOperation);
        }
    }
}

const dot = document.querySelector("#dot");

function handleNumberInput(e) {
    let num = e.target.textContent;
    if (Number.isInteger(Number(num)) || num == ".") {
        if (input.classList.contains("remove")) {
            clear(false);
            input.classList.remove("remove");

        }
        if (ongoing == false) {//after = is pressed and new inputs
            clear();
            ongoing = true;
        }
        if (num == '.') {
            if (!dot.classList.contains("disabled"))
                dot.classList.add("disabled");
            else
                return;
        }

        if (input.textContent == "0") {
            input.textContent = "";
        }
        input.textContent += num;
    }
}
numbers.addEventListener("click", e => handleNumberInput(e));

operations.addEventListener("click", handleOperationInput);


final.addEventListener("click", (e) => {

    let action = e.target.textContent;
    if (action === "=") {
        input.textContent = operate(sequence[0], input.textContent, sequence[1]);
        ongoing = false;
    }
    else if (action == "CLEAR") {
        clear();
        ongoing = false;
    }
    else if (action == "\u232B") {
        if (!input.classList.contains("remove")) {
            if (input.textContent !== "") {
                input.textContent = input.textContent.slice(0, input.textContent.length - 1)
            }
        }
    }
})

//hovering
function changeHover(e, isHovering) {
    const text = e.target.textContent
    if (!(text.length === 1 || text === "CLEAR")) return
    if (isHovering) {
        e.target.classList.add("hover");
    }
    else {
        e.target.classList.remove("hover");
    }
    input.classList.remove("hover");
}

document.addEventListener("keydown", (e) => {
    const buttons = container.querySelectorAll("button");
    const pressedButton = Array.from(buttons).find(
        button => button.textContent === e.key
    );
    
    if (pressedButton) {
        pressedButton.click();
        e.preventDefault(); // Avoid unintended page scrolling
    }
});

const toAttach = [numbers, operations, final];
toAttach.forEach(x => addEventListener("mouseover", e => changeHover(e, true)));
toAttach.forEach(x => addEventListener("mouseout", e => changeHover(e, false)));
input.removeEventListener("mouseover", e => changeHover(e, true));
input.removeEventListener("mouseout", e => changeHover(e, false));
