const btns = document.querySelectorAll(".btns");
const bdisp = document.querySelector(".botdisp");
const tdisp = document.querySelector(".topdisp");

let topDisp = "";
let botDisp = "";
let currResult = "";
let userNum1 ="";
let userNum2 = "";
let operand = "";
let clearDispAfterEquals = false;

btns.forEach(button => {
    button.addEventListener("click", (e) => {
        // console.log(button.textContent);

        //handle clear button
        if(button.textContent == "AC"){
            clearDisp();
        }
        //handle operation button
        else if(button.textContent == "+" || button.textContent == "-" || button.textContent == "X" || button.textContent == "/" || button.textContent == "%" ){
            if(userNum1 == "") return;
            else if(userNum2 != ""){
                operate(userNum1,userNum2,operand);
                userNum1 = currResult;
            }
            operand = button.textContent;
            userNum2 = userNum1;
            userNum1 = "";
            botDisp = "";
            updateDisp(botDisp);
        }
        //handle equals button
        else if(button.textContent == "="){
            operate(parseFloat(userNum1),parseFloat(userNum2),operand);
            clearDispAfterEquals = true;
        }
        //handle +/-
        else if(button.textContent == "+/-"){
            botDisp = (parseFloat(botDisp)*-1).toString();
            userNum1 = parseFloat(botDisp);
            updateDisp(botDisp);
        }
        //else handle number and decimals
        else{
            //need to handle decimal (only can enter decimal once)
            if(botDisp.includes(".") && button.textContent == ".") return;
            else{
                if(clearDispAfterEquals) {
                    clearDisp();
                    clearDispAfterEquals = false;
                }
                if(botDisp.length <=5){
                    botDisp += button.textContent;
                    userNum1 = parseFloat(botDisp);
                    updateDisp(botDisp);
                }
            }
        }
    });
});


function add(num1, num2) {
    if(num1+num2 > 999999){
        return (num1+num2).toExponential(2);
    }
    else{
        return num1 + num2;
    }
}

function subtract(num1, num2) {
    if(num1-num2 > 999999){
        return (num1+num2).toExponential(2);
    }
    else{
        return num1 - num2;
    }
}

function multiply(num1, num2) {
    if(num1*num2 > 999999){
        return (num1*num2).toExponential(2);
    }
    else{
        return num1 * num2;
    }
}

function divide(num1, num2) {
    if(num2 == 0) return "?";
    
    if(num1/num2 > 999999){
        return (num1/num2).toExponential(2);
    }
    else{
        return num1 / num2;
    }
}

function modulus(num1, num2) {
    if(num1%num2 > 999999){
        return (num1%num2).toExponential(2);
    }
    else{
        return num1 % num2;
    }
}

function operate(num2, num1, operand) {

    switch (operand) {
        case "+":
            currResult = add(num1, num2);
            botDisp = currResult.toString();
            updateDisp(botDisp)
            break;
        case "-":
            currResult = subtract(num1, num2);
            botDisp = currResult.toString();
            updateDisp(botDisp)
            break;
        case "X":
            currResult = multiply(num1, num2);
            botDisp = currResult.toString();
            updateDisp(botDisp)
            break;
        case "/":
            currResult = divide(num1, num2);
            botDisp = currResult.toString();
            updateDisp(botDisp)
            break;
        case "%":
            currResult = modulus(num1, num2);
            botDisp = currResult.toString();
            updateDisp(botDisp)
            break;
    }
}

function updateDisp(botDisp) {
    if(userNum2 == ""){bdisp.textContent = botDisp;}
    else{
        topDisp = `${userNum2}${operand}${userNum1}=`
        tdisp.textContent = topDisp;
        bdisp.textContent = botDisp;
    }

}

function clearDisp() {
    userNum1 = "";
    userNum2 = "";
    currResult = "";
    botDisp = "";
    topDisp = "";
    bdisp.textContent = "";
    tdisp.textContent = "";
}

//continuing with TOP. TODO: add keyboard functionality.
    //clean up code and some logic