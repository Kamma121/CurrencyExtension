let baseOption = document.querySelectorAll(".base");
let quoteOption = document.querySelectorAll(".quote");
let baseCurrency = document.querySelector(".base-currency");
let quoteCurrency = document.querySelector(".quote-currency");
let amountInput = document.querySelector("#amount-input");

function chooseBaseCurrency() {
    baseOption.forEach((option) => {
        option.addEventListener("click", () => {
            baseCurrency.innerHTML = `Chosen base currency : ${option.innerHTML}`;
            amountInput.style.visibility = "visible";
        })
    });
}

function chooseQuoteCurrency() {
    quoteOption.forEach((option) => {
        option.addEventListener("click", () => {
            quoteCurrency.innerHTML = `Chosen quote currency : ${option.innerHTML}`;
        })
    });
}

function swapCurrencies() {
    if (baseCurrency.innerHTML.length === 0 || quoteCurrency.innerHTML.length === 0) {
        alert("Chose both currencies");
        return;
    }
    let baseCur = baseCurrency.innerHTML.replace("Chosen base currency : ", "");
    let quoteCur = quoteCurrency.innerHTML.replace("Chosen quote currency : ", "");
    baseCurrency.innerHTML = "Chosen base currency : " + quoteCur;
    quoteCurrency.innerHTML = "Chosen quote currency : " + baseCur;
}

let myHeaders = new Headers();
myHeaders.append("apikey", "fhccg2sVQcJJJqpzcql0HWYyUHVzYaAj");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};


function calculateCurrency() {
    if (baseCurrency.innerHTML.length === 0 || quoteCurrency.innerHTML.length === 0) {

        return;
    }
    document.querySelector(".final-rate").innerHTML = "";
    let baseSymbol = baseCurrency.innerHTML.replace("Chosen base currency : ", "").slice(0, 3);
    let quoteSymbol = quoteCurrency.innerHTML.replace("Chosen quote currency : ", "").slice(0, 3);
    let amount = parseInt(amountInput.value);
    let finalRate;

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${quoteSymbol}&from=${baseSymbol}&amount=${amount}`, requestOptions)
        .then(response => response.json())
        .then(data => {

            document.querySelector(".final-rate").innerHTML = parseFloat(data.result.toFixed(2));
        })
        .catch(error => console.log('error', error));
}
let calcBtn = document.querySelector(".calc-btn");
calcBtn.addEventListener("click", calculateCurrency);
let switchBtn = document.querySelector("#switch-rates");
switchBtn.addEventListener("click",swapCurrencies);
chooseBaseCurrency();
chooseQuoteCurrency();


