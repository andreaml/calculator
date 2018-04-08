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
    let hasDot = arrayValues[arrayLength - 1].indexOf('.') > -1;
    callback(hasDot);
}

function PutNumber(number) {
        concatValue(number, display);
}

function PutOperator(operator) {
    checkLastOperator(display, function(isOperator) {
        if (isOperator) {
            replaceLastOperator(operator, display);
        } else if (!display.value.endsWith('.')){
            concatValue(operator, display);
        }
    });
}

function Dot() {
    checkDotExistence(display, function(hasDot) {
        if (!hasDot) {
            concatValue('.', display);
        }
    });
}

function Inverse() {
    checkLastOperator(display, function(isOperator) {
        if (!isOperator) {
            let arrayValues = display.value.split(/[+/*-]/g);
            if (arrayValues.length > 1) {
                inverseLastArrayIndex(arrayValues, display);
            } else {
                inverseString(display.value, display);
            }
        }
    });
}

function inverseLastArrayIndex(arrayValues, element) {
    let arrayLength = arrayValues.length;
    let arrayOperators = element.value.replace(/[0-9.neg()]/g, '').split('');
    arrayOperators.push('');
    if (arrayValues[arrayLength - 1].indexOf('neg') > -1) {
        arrayValues[arrayLength - 1] = arrayValues[arrayLength - 1].replace(/[neg()]/g, '');            
    } else {
        arrayValues[arrayLength - 1] = `neg(${arrayValues[arrayLength - 1]})`;
    }
    joinArrays(arrayOperators, arrayValues, function(newArray) {
        element.value = newArray.join('');
    });
}

function inverseString(stringValue, element) {
    if (stringValue !== '0') {
        if (stringValue.indexOf('neg') > -1) {
            element.value = stringValue.replace(/[neg()]/g, '');
        } else {
            element.value = `neg(${stringValue})`;   
        }     
    }  
}

function Reset() {
    NN=true;
    Op="";
    Num=0.0;
    Mem=0.0;
    display.value = 0;
}

function ClearError() {
    let arrayValues = display.value.split(/[+/*-]/g);
    let arrayOperators = display.value.replace(/[0-9.neg()]/g, '').split('');
    let arrayLength = arrayValues.length;
    if (arrayLength > 1) {
        arrayValues[arrayLength - 1] = '';
        joinArrays(arrayOperators, arrayValues, function(newArray) {
            display.value = newArray.join('');
        });
    } else {
        display.value = 0;        
    }
}

function joinArrays(array1, array2, callback) {
    let newArray = [];
    for (let key = 0; key < array1.length; key++) {
        newArray.push(array2[key], array1[key]);
    }
    callback(newArray);
}

function Calculate() {
    let operation = display.value.replace(/[eg()]/g, '').replace(/[n]/g, '-');
    display.value = eval(operation);
}

function initCalculator() {
    display = document.getElementById("Display");
    Reset();
}

initCalculator();