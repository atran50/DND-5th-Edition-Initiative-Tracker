const bannerColor = document.getElementById("top-banner");
const body = document.getElementById("body");
const table = document.getElementById("table-list");
const rollResult = document.getElementById("roll-result");
const tableBody =  document.getElementById("table-body");
const toggleInfo = document.getElementById("toggle-info");
const hiddenText = document.getElementById("hidden-text");


let tableRows = [];

let initVal = 0
let nameVal = "";
let hpVal = 0
let notesVal = "";
let newRow = "";
var light = true;
let rowsFromLocalStorage = JSON.parse( localStorage.getItem("tableRows") )
console.log(rowsFromLocalStorage)

hiddenText.remove();
let hiddenTextVisible = false;

if (rowsFromLocalStorage) {
    tableRows = rowsFromLocalStorage
    sortTableRows();
    renderTableRows();
}

toggleInfo.addEventListener("click", function(){
    if(!hiddenTextVisible)
    {
        toggleInfo.insertAdjacentElement("afterend", hiddenText);
        hiddenTextVisible = true;
        return;
    }
    hiddenText.remove();
    hiddenTextVisible = false;
});


function rollD20()
{
    return Math.floor(Math.random() * 20) + 1;
}

function setD20()
{
    rollResult.innerHTML = rollD20();
}

function changeColor()
{
    if(light)
    {
        body.style.backgroundColor = "#333";
        body.style.color = "#00FFFF";
        toggleInfo.style.color = "red";
        light = false
    }
    else
    {
        body.style.backgroundColor = "whitesmoke";
        body.style.color = "#333";
        toggleInfo.style.color = "blue";
        light = true;
    }
}

function sortTableRows()
{
    for(let i = 0; i < tableRows.length; i++)
    {
        for(let j = 0; j < tableRows.length - i - 1; j++)
        {
            let currInit = parseInt(tableRows[j].init);
            let nextInit = parseInt(tableRows[j+1].init);
            if(currInit < nextInit)
            {
                let temp = tableRows[j];
                tableRows[j] = tableRows[j+1];
                tableRows[j+1] = temp;
            }
        }
    }
    localStorage.setItem("tableRows", JSON.stringify(tableRows));
}

function renderTableRows()
{
    tableBody.innerHTML = "";
    for(let i = 0; i < tableRows.length; i++)
    {
        var init = tableRows[i].init;
        var name = tableRows[i].name;
        var hp = tableRows[i].hp;
        var notes = tableRows[i].notes;

        var rowAsHTML = buildRow(init, name, hp, notes);

        tableBody.innerHTML += rowAsHTML;
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

function saveInput()
{
    var rowObject = 
    {
        init: initVal,
        name: nameVal,
        hp: hpVal,
        notes: notesVal
    };

    
    if(localStorage.getItem(tableRows) === null)
    {
        tableRows.push(rowObject);
        localStorage.setItem("tableRows", JSON.stringify(tableRows));
    }
    else
    {
        tableRows = JSON.parse(localStorage.getItem("tableRows"));
        tableRows.push(rowObject);
        localStorage.setItem("tableRows", JSON.stringify(tableRows));
    }
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


function remove(elem)
{
    var thisTableRow = elem.parentNode.parentNode;

    var rowChildElements = thisTableRow.children;

    var deletingInit;
    var deletingName;
    var deletingHp;
    var deletingNotes;

    if(rowChildElements)
    {
        deletingInit = rowChildElements[0].textContent;
        deletingName = rowChildElements[1].textContent;
        deletingHp = rowChildElements[2].textContent;
        deletingNotes = rowChildElements[3].textContent;
    }

    removeFromLocalStorage(deletingInit, deletingName, deletingHp, deletingNotes)
    thisTableRow.remove();
}

function removeFromLocalStorage(deletingInit, deletingName, deletingHp, deletingNotes)
{
    for(let i = 0; i < tableRows.length; i++)
    {
        let init = tableRows[i].init;
        let name = tableRows[i].name;
        let hp = tableRows[i].hp;
        let notes = tableRows[i].notes;

        if(init === deletingInit && 
            name === deletingName &&
            hp === deletingHp &&
            notes === deletingNotes)
            {
                tableRows.splice(i, 1);
                localStorage.setItem("tableRows", JSON.stringify(tableRows));
                return
            }
    }
}

 function main()
 {
    getInput();
    saveInput();
    sortTableRows();
    renderTableRows();
 }