// Startfeld editierbar machen
document.getElementById("start").contentEditable = true;

// Zielfeld sperren
document.getElementById("ziel").contentEditable = false;


// Switch Button 
function switchLocations() {
    console.log("switched");
    let temp = document.getElementById("ziel").innerText;
    document.getElementById("ziel").innerText = document.getElementById("start").innerText;
    document.getElementById("start").innerText = temp;
}
document.getElementById("switch").addEventListener("click", switchLocations);