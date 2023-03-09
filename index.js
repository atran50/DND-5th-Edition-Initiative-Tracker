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
        body.style.backgroundColor = "#333";
        body.style.color = "#00FFFF";
        light = false
    }
    else
    {
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

    var removeButton = '<button id="remove-button" onclick="remove(this)">Remove</button>'
   
    var stringHeader = '<tr class="table-row" initiative=' + initVal + ">";
    var initData = "<td>" + init + "</td>";
    var nameData = "<td contenteditable>" + name + "</td>";
    var hpData  = "<td contenteditable>" + hp + "</td>";
    var notesData = "<td contenteditable>" + notes + "</td>";
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

 function appendNewInit(newRow, initVal)
 {
    var rows = document.getElementsByClassName("table-row");
    if(rows.length === 0)
    {
        document.getElementById("table-body").innerHTML += newRow;
        return;
    }

    var i = 0;
    while(i !== rows.length){
        var indexInit = parseInt(rows[i].getAttribute("initiative"));
        initVal = parseInt(initVal);

        if(initVal === indexInit)
        {
            rows[i].insertAdjacentHTML("beforebegin", newRow);
            return;
        }

        if(initVal > indexInit)
        {
            rows[i].insertAdjacentHTML("beforebegin", newRow);
            return;
        }

        if(i + 1 !== rows.length)
        {
            var nextInit = rows[i+1].getAttribute("initiative");
            if(initVal < indexInit && initVal > nextInit)
            {
                rows[i + 1].insertAdjacentHTML("beforebegin", newRow);
                return;
            }
        }
        i++;
    }
    rows[rows.length - 1].insertAdjacentHTML("afterend", newRow);
 }

function remove(elem)
{
    elem.parentNode.parentNode.remove();
}

 function main()
 {
    getInput();
    newRow = buildRow(initVal, nameVal, hpVal, notesVal);
    appendNewInit(newRow, initVal);
 }