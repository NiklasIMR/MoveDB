// Felder nicht editierbar machen
document.getElementById("input-start").contentEditable = false;
document.getElementById("input-ziel").contentEditable = false;


const fahrzeit_E97_Tor17 = [
  "07:13","07:28","07:43","07:58","08:13","08:28","08:43","08:58",
  "09:13","09:28","09:43","09:58","10:28","10:58","11:28","11:58",
  "12:28","12:58","13:28","13:58","14:13","14:28","14:43","14:58",
  "15:13","15:28","15:43","15:58","16:13","16:28","16:58","17:28"
];

const fahrzeit_Tor17_E97 = [
  "07:12","07:27","07:42","07:57","08:12","08:27","08:42","08:57",
  "09:12","09:42","10:12","10:42","11:12","11:42","12:12","12:42",
  "13:12","13:42","14:12","14:33","14:48","15:03","15:18","15:33",
  "15:48","16:03","16:18","16:33","16:48","17:18"
];



// Switch Button 
function switchLocations() {
    console.log("switched");
    let temp = document.getElementById("input-ziel").innerText;
    document.getElementById("input-ziel").innerText = document.getElementById("input-start").innerText;
    document.getElementById("input-start").innerText = temp;
    onDropdownSelect();
}
document.getElementById("switch").addEventListener("click", switchLocations);
function getAbfahrt(){
    if(document.getElementById("input-start").innerText == "Wolfsburg E97"){
        return fahrzeit_E97_Tor17;
    }
    else {
        return fahrzeit_Tor17_E97;
    }
}

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
    //console.log("Neue Auswahl:", timeSelect.value);
    const reiseKarten = document.querySelectorAll(".reise-card");
    abf = toMin(timeSelect.value); //int
    //                 ^-Liefert string

    let abfahrten = getAbfahrt();

    let index = 0;

    for(let i = 0; i < abfahrten.length; i++){
        // gegeben = abf in Minuten
        if(toMin(abfahrten[i]) >= abf) {
            index = i;
            console.log("Nächste Abfahrt: " + abfahrten[i]);
            break;
        }
    }
    let dauer = 12;
    for (let i = 0; i < reiseKarten.length; i++) {
        reiseKarten[i].querySelector(".abfahrt").innerText = abfahrten[index+i];
        reiseKarten[i].querySelector(".ankunft").innerText = toString(toMin(abfahrten[index+i]) + dauer);
        reiseKarten[i].querySelector(".dauer").innerText = dauer + "min";
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
