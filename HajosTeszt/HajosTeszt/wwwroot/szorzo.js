window.onload = function () {
    console.log("start")
    let hova = document.getElementById("ide");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor")
        hova.appendChild(sor);

        for (var o = 0; o < 10; o++) {
            let szám = document.createElement("div");
            szám.classList.add("elem")
            szám.innerText = (s + 1) * (o + 1)
            sor.appendChild(szám);
            szám.style.background = `rgb(${255 / 10 * o},0,0)`
        }
    }
}