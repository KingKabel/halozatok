window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("előre_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    //document.getElementById("válasz1").onclick = valaszt1();
    //document.getElementById("válasz2").onclick = valaszt2();
    //document.getElementById("válasz3").onclick = valaszt3();
    kérdésBetöltés(kérdésCount);
}

var kérdésCount = 1;
var helyesVálasz;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: $ {response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}


function kérdésMegjelenítés(kérdés) {
    if (!kérdés) return;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;

    document.getElementById("válasz1").innerText = kérdés.answer1;

    document.getElementById("válasz2").innerHTML = kérdés.answer2;

    document.getElementById("válasz3").innerHTML = kérdés.answer3;

    helyesVálasz = kérdés.correctAnswer;

    if (kérdés.image == "") {
        document.getElementById("kép1").style.visibility = 'hidden';
        document.getElementById("kép1").alt = "Nincsen megjeleníthető kép";
    } else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").style.visibility = 'visible';
    }
}

function valaszt1() {
    if (helyesVálasz == 1) {
        document.getElementById("válasz1").className = "kerdes jó";
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    } else {
        document.getElementById("válasz1").className = "kerdes rossz";
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    }
}

function valaszt2() {
    if (helyesVálasz == 2) {
        document.getElementById("válasz2").className = "kerdes jó";
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    } else {
        document.getElementById("válasz2").className = "kerdes rossz";
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    }
}

function valaszt3() {
    if (helyesVálasz == 3) {
        document.getElementById("válasz3").className = "kerdes jó";
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
    } else {
        document.getElementById("válasz3").className = "kerdes rossz";
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
    }
}

function előre() {
    kérdésCount++;
    document.getElementById("válasz1").className = "";
    document.getElementById("válasz2").className = "";
    document.getElementById("válasz3").className = "";
    document.getElementById("válasz1").className = "kerdes kattintható";
    document.getElementById("válasz2").className = "kerdes kattintható";
    document.getElementById("válasz3").className = "kerdes kattintható";
    document.getElementById("válasz1").onclick = valaszt1;
    document.getElementById("válasz2").onclick = valaszt2;
    document.getElementById("válasz3").onclick = valaszt3;
    kérdésBetöltés(kérdésCount);
}

function vissza() {
    kérdésCount--;
    document.getElementById("válasz1").className = "";
    document.getElementById("válasz2").className = "";
    document.getElementById("válasz3").className = "";
    document.getElementById("válasz1").className = "kerdes kattintható";
    document.getElementById("válasz2").className = "kerdes kattintható";
    document.getElementById("válasz3").className = "kerdes kattintható";
    document.getElementById("válasz1").onclick = valaszt1();
    document.getElementById("válasz2").onclick = valaszt2();
    document.getElementById("válasz3").onclick = valaszt3();
    kérdésBetöltés(kérdésCount);
}