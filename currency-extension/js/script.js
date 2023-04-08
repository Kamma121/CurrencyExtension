let baseOption = document.querySelectorAll(".base");
let quoteOption = document.querySelectorAll(".quote");
let amountInput = document.querySelector("#amount-input");
let baseDropdown = document.querySelector("#dropdownBaseCurrency");
let quoteDropdown = document.querySelector("#dropdownQuoteCurrency");

function chooseBaseCurrency() {
    baseOption.forEach((option) => {
        option.addEventListener("click", () => {
            baseDropdown.innerHTML = option.innerHTML;
            amountInput.style.visibility = "visible";
            console.log(baseDropdown.innerHTML.length);
        })
    });
}

function chooseQuoteCurrency() {
    quoteOption.forEach((option) => {
        option.addEventListener("click", () => {

            quoteDropdown.innerHTML = option.innerHTML;
        })
    });
}

function swapCurrencies() {
    let baseCur = baseDropdown.innerHTML;
    let quoteCur = quoteDropdown.innerHTML;
    quoteDropdown.innerHTML = baseCur;
    baseDropdown.innerHTML = quoteCur;
}

let myHeaders = new Headers();
myHeaders.append("apikey", "fhccg2sVQcJJJqpzcql0HWYyUHVzYaAj");
let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};


function calculateCurrency() {
    document.querySelector(".final-rate").innerHTML = "";
    let baseSymbol = baseDropdown.innerHTML.replace("Chosen base currency : ", "").slice(0, 3);
    let quoteSymbol = quoteDropdown.innerHTML.replace("Chosen quote currency : ", "").slice(0, 3);
    let amount = parseInt(amountInput.value);

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
switchBtn.addEventListener("click", swapCurrencies);
chooseBaseCurrency();
chooseQuoteCurrency();


