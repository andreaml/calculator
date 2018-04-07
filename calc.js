var NN=true;
var Op="";
var Num=0.0;
var Mem=0.0;
var display; 

function concatValue(newValue, element) {
    element.value += newValue;
}

function checkLastOperator(element, callback) {
    let operators = {
        "+": true,
        "-": true,
        "*": true,
        "/": true
    }
    let lastValuePosition = element.value.length - 1;
    let lastValue = element.value[lastValuePosition];
    callback(operators[lastValue]);
}

function replaceLastOperator(newValue, element) {
    let lastOperatorPosition = element.value.length - 1;
    let arrayValues = element.value.split('');
    arrayValues[lastOperatorPosition] = newValue;
    element.value = arrayValues.join('');
}

function PutNumber(number) {
    concatValue(number, display);
}

function PutOperator(operator) {
    checkLastOperator(display, function(validToReplace) {
        if (validToReplace) {
            replaceLastOperator(operator, display);
        } else {
            concatValue(operator, display);
        }
    });
}

function initCalculator() {
    display = document.getElementById("Display");
}

initCalculator();