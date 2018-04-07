var NN=true;
var Op="";
var Num=0.0;
var Mem=0.0;
var display; 

function concatValue(newValue, element) {
    element.value += newValue;
}

function PutNumber(number) {
    concatValue(number, display);
}

function initCalculator() {
    display = document.getElementById("Display");
}

initCalculator();