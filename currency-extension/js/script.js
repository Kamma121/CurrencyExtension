const baseOption = document.querySelectorAll(".base");
const quoteOption = document.querySelectorAll(".quote");
const amountInput = document.querySelector("#amount-input");
const baseDropdown = document.querySelector("#dropdownBaseCurrency");
const quoteDropdown = document.querySelector("#dropdownQuoteCurrency");

function chooseBaseCurrency() {
    baseOption.forEach((option) => {
        option.addEventListener("click", () => {
            baseDropdown.innerHTML = option.innerHTML;
            amountInput.style.visibility = "visible";
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
const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

function calculateCurrency() {
    document.querySelector(".final-rate").innerHTML = "";
    const baseSymbol = baseDropdown.innerHTML.replace("Chosen base currency : ", "").slice(0, 3);
    const quoteSymbol = quoteDropdown.innerHTML.replace("Chosen quote currency : ", "").slice(0, 3);
    const amount = parseInt(amountInput.value);
    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${quoteSymbol}&from=${baseSymbol}&amount=${amount}`;
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            document.querySelector(".final-rate").innerHTML = parseFloat(data.result.toFixed(2));
        })
        .catch(error => console.log('error', error));
}

const calcBtn = document.querySelector(".calc-btn");
calcBtn.addEventListener("click", calculateCurrency);
const switchBtn = document.querySelector("#switch-rates");
switchBtn.addEventListener("click", swapCurrencies);
chooseBaseCurrency();
chooseQuoteCurrency();