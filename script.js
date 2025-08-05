// const math = require('mathjs');

function operate(a, b, operation) {
    return math.evaluate(`{a} {operation} {b}`);
}

const input = document.querySelector(".input");
const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");
const final = document.querySelector(".bottom");

let numList = [];
let opList = [];
let ongoing = false;

function clear() {
    numList = [];
    opList = [];
    ongoing = false;
    input.textContent = "";
}

numbers.addEventListener("click", (e) => {
    if (!ongoing) {
        clear();
        ongoing = true;
    }
    let num = e.target.textContent;
    if (num == '.') {

    }
    if (Number.isInteger(Number(num))) {
        if (num === "0" && input.textContent.length == 0) {
            return;
        }
        input.textContent += num;
    }

})

//this determines when accumulated/current are set; splits up things
operations.addEventListener("click", (e) => {
    let currentOperation = e.target.textContent;
    let text = input.textContent;
    //if one of the four operations is clicked
    if (text.length > 0 && currentOperation.length == 1) {
        numList.push(text);
        //if this isn't the first operation press
        if (numList.length !== 0) {
            let index = (opList.length - 1) * 2;
            let previousResult = operate(numList[index], numList[index + 1], opList.at(-1));
            input.textContent = previousResult;
            numList.push(previousResult);
        }
        //push after b/c do not need this yet
        //if statement to deal w/ consecutive operation presses
        opList.push(currentOperation);
        current = text;
    }
})

final.addEventListener("click", (e) => {
    ongoing = false;
    let action = e.target.textContent;
    if (action === "=") {
        input.textContent = operate(accumulated, current, operation);
    }
    else if (action == "CLEAR") {
        clear();
    }
})