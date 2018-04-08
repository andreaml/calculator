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

function checkDotExistence(element, callback) {
    let arrayValues = element.value.split(/[+/*-]/g);
    let arrayLength = arrayValues.length;
    let dotExists = arrayValues[arrayLength - 1].indexOf('.') > -1;
    callback(!dotExists);
}

function PutNumber(number) {
        concatValue(number, display);
}

function PutOperator(operator) {
    checkLastOperator(display, function(validToReplace) {
        if (validToReplace) {
            replaceLastOperator(operator, display);
        } else if (!display.value.endsWith('.')){
            concatValue(operator, display);
        }
    });
}

function Dot() {
    checkLastOperator(display, function(invalidToConcatDot) {
        if (!invalidToConcatDot) {
            checkDotExistence(display, function(validToConcatDot) {
                if (validToConcatDot) {
                    concatValue('.', display);
                }
            });
        }
    });
}

function Reset() {
    NN=true;
    Op="";
    Num=0.0;
    Mem=0.0;
    display.value = '';
}

function initCalculator() {
    display = document.getElementById("Display");
    Reset();
}

initCalculator();