let quote = {
    text: ""
};

let quoteDisplayEl = document.getElementById("quoteDisplay");
let timerEl = document.getElementById("timer");
let typingTestContainerEl = document.getElementById("typingTestContainer");
let statusEl = document.getElementById("status");

let countDown = 1;

let options = {
    method: "GET"
};
statusEl.classList.remove("d-none");
fetch("https://apis.ccbp.in/random-quote", options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        typingTestContainerEl.classList.remove("d-none");
        quote.text = jsonData.content;
        quoteDisplayEl.textContent = jsonData.content;
        statusEl.classList.add("d-none");
    });

let uniqueId = setInterval(function() {
    countDown += 1;
    timerEl.textContent = countDown;
}, 1000);

let submitBtnEl = document.getElementById("submitBtn");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");

submitBtnEl.addEventListener("click", function(event) {
    if (quoteInputEl.value === quote.text) {
        clearInterval(uniqueId);
        resultEl.textContent = "You Typed in " + countDown + " seconds";
    } else {
        resultEl.textContent = "You Typed incorrect sentence";
    }
});

let resetBtnEl = document.getElementById("resetBtn");

resetBtnEl.addEventListener("click", function(event) {
    let options = {
        method: "GET"
    };
    typingTestContainerEl.classList.add("d-none");
    statusEl.classList.remove("d-none");
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            statusEl.classList.add("d-none");
            quote.text = jsonData.content;
            quoteDisplayEl.textContent = jsonData.content;
            typingTestContainerEl.classList.remove("d-none");
        });
    countDown = 0;
    clearInterval(uniqueId);
    uniqueId = setInterval(function() {
        countDown += 1;
        timerEl.textContent = countDown;
    }, 1000);
    quoteInputEl.value = "";
    resultEl.textContent = "";
});