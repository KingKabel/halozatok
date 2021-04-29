window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("előre_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    init();
}

var kérdésCount = 1;
var helyesVálasz;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timeoutHandler;

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
            if (!result.ok) {
                console.error(`Hibás válasz: $ {response.status}`)
            }
            else {
                return result.json()
            }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)

                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
         );
}

function init() {
    let l = window.localStorage.getItem("lista")
    let nx = window.localStorage.getItem("next")
    if (l && nx) {
        console.log("Van lista")
        hotList = JSON.parse(l)
        nextQuestion = nx
        displayedQuestion = 0
        kérdésMegjelenítés()

    }
    else {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }

        //Első kérdések letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
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
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    } else {
        document.getElementById("válasz1").className = "kerdes rossz";
        hotList[displayedQuestion].goodAnswers = 0;
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    }
    window.localStorage.setItem("lista", JSON.stringify(hotList));
    window.localStorage.setItem("next", JSON.stringify(nextQuestion));
    timeoutHandler = setTimeout(előre, 3000);
}

function valaszt2() {
    if (helyesVálasz == 2) {
        document.getElementById("válasz2").className = "kerdes jó";
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    } else {
        document.getElementById("válasz2").className = "kerdes rossz";
        hotList[displayedQuestion].goodAnswers = 0;
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz3").className = "kerdes";
        document.getElementById("válasz3").onclick = "";
    }
    window.localStorage.setItem("lista", JSON.stringify(hotList));
    window.localStorage.setItem("next", JSON.stringify(nextQuestion));
    timeoutHandler = setTimeout(előre, 3000);
}

function valaszt3() {
    if (helyesVálasz == 3) {
        document.getElementById("válasz3").className = "kerdes jó";
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
    } else {
        document.getElementById("válasz3").className = "kerdes rossz";
        hotList[displayedQuestion].goodAnswers = 0;
        document.getElementById("válasz1").className = "kerdes";
        document.getElementById("válasz1").onclick = "";
        document.getElementById("válasz2").className = "kerdes";
        document.getElementById("válasz2").onclick = "";
    }
    window.localStorage.setItem("lista", JSON.stringify(hotList));
    window.localStorage.setItem("next", JSON.stringify(nextQuestion));
    timeoutHandler = setTimeout(előre, 3000);
}

function előre() {
    if (hotList[displayedQuestion].goodAnswers == 3) {
        kérdésBetöltés(nextQuestion, displayedQuestion);
        nextQuestion++;
        hotList[displayedQuestion].goodAnswers = 0;
    }
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    document.getElementById("válasz1").className = "";
    document.getElementById("válasz2").className = "";
    document.getElementById("válasz3").className = "";
    document.getElementById("válasz1").className = "kerdes kattintható";
    document.getElementById("válasz2").className = "kerdes kattintható";
    document.getElementById("válasz3").className = "kerdes kattintható";
    document.getElementById("válasz1").onclick = valaszt1;
    document.getElementById("válasz2").onclick = valaszt2;
    document.getElementById("válasz3").onclick = valaszt3;
    kérdésMegjelenítés();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion == -1) displayedQuestion = questionsInHotList - 1;
    document.getElementById("válasz1").className = "";
    document.getElementById("válasz2").className = "";
    document.getElementById("válasz3").className = "";
    document.getElementById("válasz1").className = "kerdes kattintható";
    document.getElementById("válasz2").className = "kerdes kattintható";
    document.getElementById("válasz3").className = "kerdes kattintható";
    document.getElementById("válasz1").onclick = valaszt1();
    document.getElementById("válasz2").onclick = valaszt2();
    document.getElementById("válasz3").onclick = valaszt3();
    kérdésMegjelenítés();
}