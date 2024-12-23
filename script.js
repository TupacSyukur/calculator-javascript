function operate(num1, num2, operation) {
    let result;

    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break
        case "*":
            result = num1 * num2;
            break
        case "/":
            if (num2 === 0) {
                alert("Can not divide by zero!");
                return 0;
            }
            result = num1 / num2;
            break
        default:
            break;
    }

    if (result.toString().includes('.')) {
        const roundedValue = parseFloat(result).toPrecision(8);
        result = parseFloat(roundedValue).toString(); // Remove trailing zeroes
      }

    return result;
}

let num1;
let num2;
let operator;
let operatorClicked = false;

const buttonNumber = document.querySelectorAll("button.number");
const display = document.querySelector(".display");
const buttonOperator = document.querySelectorAll(".operator");
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

buttonNumber.forEach(button => {
    button.addEventListener("click", () => {
        if (display.textContent === '0') {
            display.textContent = button.textContent;
        } else if (operatorClicked === true) {
            display.textContent = '';
            operatorClicked = false;
        } else {
            display.textContent += button.textContent;
        }
    });
});

buttonOperator.forEach(button => {
    button.addEventListener("click", () => {
        if (num1 !== undefined) {
            num2 = display.textContent;
            let result = operate(Number(num1), Number(num2), operator);
            display.textContent = result;
            operator = button.textContent;
            num2 = undefined;
            num1 = result;
        } else {
            num1 = display.textContent;
            operator = button.textContent;
        }
        operatorClicked = true;
    })
});

equal.addEventListener("click", () => {
    num2 = display.textContent;
    if (num1 !== undefined || num2 !== undefined) {
        let result = operate(Number(num1), Number(num2), operator);
        display.textContent = result;
        num2 = undefined;
        num1 = undefined;
    } else {
        alert("Please enter the number before doing any operation!");
    }
});

clear.addEventListener("click", () => {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    display.textContent = 0;
});