
const bannerColor = document.getElementById("top-banner");

var light = true;

function changeColor()
{
    if(light)
    {
        bannerColor.style.backgroundColor = "red";
        light = false;
    }
    else
    {
        bannerColor.style.backgroundColor = "navy";
        light = true;
    }
}

function getInput()
{
    var init = document.getElementById("initInput");
    var name = document.getElementById("nameInput");
    var hp = document.getElementById("hpInput");
    var notes = document.getElementById("notesInput");
    console.log(init.value + " " + name.value + " " + hp.value + " " + notes.value);

    init.value="";
    name.value="";
    hp.value="";
    notes.value="";
}