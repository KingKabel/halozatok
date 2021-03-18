window.onload = () => {
    console.log("pascal start")
    var hova = document.getElementById("pascal");
    for (var sor = 0; sor < 10; sor++) {
        var aktuálisSor = document.createElement("div");
        aktuálisSor.classList.add("sor")
        hova.appendChild(aktuálisSor)
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var aktuálisElem = document.createElement("div");
            aktuálisElem.classList.add("elem")
            let e = faktoriális(sor) / (faktoriális(oszlop) * faktoriális(sor - oszlop))
            aktuálisElem.innerHTML = e
            aktuálisSor.appendChild(aktuálisElem)
        }
    }
}
var faktoriális = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}