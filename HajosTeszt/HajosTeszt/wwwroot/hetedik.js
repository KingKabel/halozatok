var kérdésCount = 0;
var kérdések;
window.onload = () => {
    console.log("letöltés start");
    letöltés();
}

function letöltés () {
        fetch('/questions/${kérdésCount}')
            .then(response => response.json())
            .then(data => letöltésBefejeződött(data)
            );
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    console.log(`${d.length} kérdés érkezett`);
    kérdések = d;
    kérdésbetöltés(kérdésCount);
}

function kérdésbetöltés(id) {
    fetch('/questions/${id}')
        .then(válaszFeldolgozás)
        .then(kérdésMegjelenítés);
}
function válaszFeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error('Hibás válasz: ${response.status}')
    }
    else {
        return válasz.json()
    }
}

function kérdésMegjelenítés(k) {
    console.log(k);
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[k].questionText;

    document.getElementById("válasz1").innerHTML = kérdések[k].answer1;

    if (kérdések[k].correctAnswer == 1) {
        document.getElementById("válasz1").className = "kerdes kattintható jó";
    } else {
        document.getElementById("válasz1").className = "kerdes kattintható rossz";
    }


    document.getElementById("válasz2").innerHTML = kérdések[k].answer2;

    if (kérdések[k].correctAnswer == 2) {
        document.getElementById("válasz2").className = "kerdes kattintható jó";
    } else {
        document.getElementById("válasz2").className = "kerdes kattintható rossz";
    }


    document.getElementById("válasz3").innerHTML = kérdések[k].answer3;

    if (kérdések[k].correctAnswer == 3) {
        document.getElementById("válasz3").className = "kerdes kattintható jó";
    } else {
        document.getElementById("válasz3").className = "kerdes kattintható rossz";
    }


    if (kérdések[k].image == "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image;
        document.getElementById("kép1").alt = "Nincsen megjeleníthető kép";
    } else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image;
    }
}

function előre() {
    if (kérdésCount == 2) {
        kérdésCount = 0;
    } else {
        kérdésCount++;
    }
    kérdésMegjelenítés(kérdésCount);
}
function vissza() {
    if (kérdésCount == 0) {
        kérdésCount = 2;
    } else {
        kérdésCount--;
    }
    kérdésMegjelenítés(kérdésCount);
}