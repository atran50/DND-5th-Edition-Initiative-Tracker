
const bannerColor = document.getElementById("top-banner");

const body = document.getElementById("body");

const table = document.getElementById("table-list");


let initVal = 0
let nameVal = "";
let hpVal = 0
let notesVal = "";

let newRow = "";

var light = true;

function changeColor()
{
    if(light)
    {
        /*
        bannerColor.style.backgroundColor = "red";
        light = false;
        */

        body.style.backgroundColor = "#333";
        body.style.color = "#00FFFF";
        light = false
    }
    else
    {
        /*
        bannerColor.style.backgroundColor = "navy";
        */
       body.style.backgroundColor = "whitesmoke";
       body.style.color = "#333";
        light = true;
    }
}

function getInput()
{
    var init = document.getElementById("initInput");
    var name = document.getElementById("nameInput");
    var hp = document.getElementById("hpInput");
    var notes = document.getElementById("notesInput");

    initVal = init.value;
    nameVal = name.value;
    hpVal = hp.value;
    notesVal = notes.value;

    console.log(init.value + " " + name.value + " " + hp.value + " " + notes.value);

    init.value="";
    name.value="";
    hp.value="";
    notes.value="";
}

 function buildRow(init, name, hp, notes)
 {
    var string;

    var removeButton = '<button id="remove-button" onclick="remove()">Remove</button>'
   
    var stringHeader = "<tr class=table-row initiative=" + initVal + ">";
    var initData = "<td>" + init + "</td>";
    var nameData = "<td>" + name + "</td>";
    var hpData  = "<td>" + hp + "</td>";
    var notesData = "<td>" + notes + "</td>";
    var placeholder = "<td>" + removeButton + "</td>";
 
    string = stringHeader;
    string += initData;
    string += nameData;
    string += hpData;
    string += notesData;
    string += placeholder;
    string += "</tr>";

    return string;
 }

 function appendHtml(newRow)
 {
    document.getElementById("table-body").innerHTML += newRow;
 }

 function main()
 {
    getInput();
    newRow = buildRow(initVal, nameVal, hpVal, notesVal);
    console.log(newRow);
    appendHtml(newRow);
 }