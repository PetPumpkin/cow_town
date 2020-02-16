var updateTextBox = document.getElementById("updateText");
var updateTextBoxOld = document.getElementById("oldUpdateText");


var updateString = "";
var oldUpdateString = ""; 

function updateText(string){
    oldUpdateString = updateString + " < " + oldUpdateString;
    updateString = string;

    updateTextBox.innerHTML = updateString + " < ";
    updateTextBoxOld.innerHTML = oldUpdateString;
}
