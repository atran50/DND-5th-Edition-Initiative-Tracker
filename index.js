
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
