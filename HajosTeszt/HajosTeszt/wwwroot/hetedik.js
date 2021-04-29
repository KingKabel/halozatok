var kérdésCount = 0;

window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("előre_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    kérdésBetöltés(kérdésCount)
}

function kérdésBetöltés(szam) {
    fetch('/questions/${szam}')
        .then(response => {
            if (!response.ok) {
                console.error('Hibás válasz: ${response.status}')
            }
            else {
                kérdésMegjelenítés(response.json())
            }
        })
}  


function kérdésMegjelenítés(k) {
    if (!k) return;
    console.log(k);
    document.getElementById("kérdés_szöveg").innerText = k.questionText;

    document.getElementById("válasz1").innerText = k.answer1;

    if (k.correctAnswer == 1) {
        document.getElementById("válasz1").className = "kerdes kattintható jó";
    } else {
        document.getElementById("válasz1").className = "kerdes kattintható rossz";
    }

    document.getElementById("válasz2").innerHTML = k.answer2;

    if (k.correctAnswer == 2) {
        document.getElementById("válasz2").className = "kerdes kattintható jó";
    } else {
        document.getElementById("válasz2").className = "kerdes kattintható rossz";
    }

    document.getElementById("válasz3").innerHTML = k.answer3;

    if (k.correctAnswer == 3) {
        document.getElementById("válasz3").className = "kerdes kattintható jó";
    } else {
        document.getElementById("válasz3").className = "kerdes kattintható rossz";
    }

    if (k.image == "") {
        document.getElementById("kép1").hidden = true;
        document.getElementById("kép1").alt = "Nincsen megjeleníthető kép";
    } else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + k.image;
        document.getElementById("kép1").hidden = false;
    }
}

function előre() {
    kérdésCount++;
    kérdésBetöltés(kérdésCount);
}
function vissza() {
    kérdésCount--;
    kérdésBetöltés(kérdésCount);
}