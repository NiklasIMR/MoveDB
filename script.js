// Felder nicht editierbar machen
document.getElementById("start").contentEditable = false;
document.getElementById("ziel").contentEditable = false;

// Switch Button 
function switchLocations() {
    console.log("switched");
    let temp = document.getElementById("ziel").innerText;
    document.getElementById("ziel").innerText = document.getElementById("start").innerText;
    document.getElementById("start").innerText = temp;
}
document.getElementById("switch").addEventListener("click", switchLocations);

let Abfahrt = new Date();
let Ankunft = new Date();

// DD-Feld befüllen
const timeSelect = document.getElementById("timeField");
for (let hour = 6; hour <= 18; hour++) {
    for (let min of [0, 30]) {
        let h = hour.toString().padStart(2, "0");
        let m = min.toString().padStart(2, "0");

        let option = document.createElement("option");
        option.value = `${h}:${m}`;
        option.text = `${h}:${m}`;
        
        timeSelect.appendChild(option);
        timeSelect.value = "14:00";  // standardmäßig 08:00 ausgewählt
    }
}


function toString(min) {
	if (min === 0) return "-";

    let negativ = min < 0;
    min = Math.abs(min);

    let hours = Math.floor(min / 60);
    let minutes = min % 60;

    // Optional: führende Null für Minuten
    let minutesStr = minutes.toString().padStart(2, "0");

    let result = `${hours}:${minutesStr}`;
    return negativ ? "-" + result : result;
}
function toMin(zeit) {
	if (zeit === "-") return 0;

    let negativ = zeit.startsWith("-");
    if (negativ) {
        zeit = zeit.substring(1); // Minuszeichen entfernen
    }

    let teile = zeit.split(":");
    let stunden = parseInt(teile[0], 10);
    let minuten = parseInt(teile[1], 10);

    let gesamt = stunden * 60 + minuten;
    return negativ ? -gesamt : gesamt;
}


// Zeit aktualisieren
function onDropdownSelect() {
    console.log("Neue Auswahl:", timeSelect.value);
    const reiseKarten = document.querySelectorAll(".reise-card");
    abf = toMin(timeSelect.value); //int
    //                 ^-Liefert string

    for (let i = 0; i < reiseKarten.length; i++) {
        // Abfahrt in Karte setzen
        let newAbf = abf + 30 * i
        reiseKarten[i].querySelector(".abfahrt").innerText = toString(newAbf);
        reiseKarten[i].querySelector(".ankunft").innerText = toString(newAbf + 10);
        // Optional: Ankunft berechnen (z.B. Dauer 90 min)
        
    }
}
timeField.addEventListener("change", onDropdownSelect);





// ZEITBERECHNUNG
{
/*    // Abfahrt: 08:30
let abfahrt = new Date();
abfahrt.setHours(8, 30, 0, 0);  // Stunden, Minuten, Sekunden, Millisekunden

// Ankunft: 10:12
let ankunft = new Date();
ankunft.setHours(10, 12, 0, 0);

// Differenz in Millisekunden
let diffMs = ankunft - abfahrt;  

// In Minuten umrechnen
let diffMin = diffMs / 1000 / 60;

console.log("Dauer in Minuten:", diffMin); // 102

//In Stunden
let hours = Math.floor(diffMin / 60);
let minutes = diffMin % 60;

console.log(`Dauer: ${hours}h ${minutes}min`);  // Dauer: 1h 42min
*/}





//KOMMENTAR
{/*

    
*/}
