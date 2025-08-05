// const math = require('mathjs');

function operate(a, b, operation) {
    return math.evaluate(`{a} {operation} {b}`);
}

const input = document.querySelector(".input");
const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");
const final = document.querySelector(".bottom");

function beginCalculation() {

}

let first = "";
let second = "";
let operation = "";
// input.addEventListener("change", () => beginCalculation());

numbers.addEventListener("click", (e) => {
    let num = e.target.textContent;
    if (num == '.')
    {
        
    }
    if (Number.isInteger(Number(num)))
    {
        if (num === "0" && input.textContent.length == 0) {
            return;
        }
        input.textContent += num;
        // b = input.textContent;
    }
        
})

operations.addEventListener("click", (e) => {
    let operation = e.target.textContent;
    let a = input.textContent;
    if (a.length > 0) {
        first = a;
        input.textContent = "";
    }
})