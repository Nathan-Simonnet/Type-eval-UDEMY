const APIEndpoint = "http://api.quotable.io/random";

let quote;
function quotesFetcher() {
    fetch('http://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            quote = data.content;
            console.log(quote);
            textModelDisplayer();
        })
        .catch((error) => console.log(error))
}
quotesFetcher()

// let quotesArray = [];
// (function quotesFetcher() {
//     fetch('./ressources/quotes.json')
//         .then((response) => response.json())
//         .then((data) => {
//             // quotesArray.push(data.quotes)
//             quotesArray = data.quotes
//             console.log(quotesArray)
//         })
//         .catch((error) => console.log(error))
// }());

const textModelContainer = document.querySelector('.text-model-container');
function textModelDisplayer() {
    const textModel = document.createElement('p');
    textModel.setAttribute("id", "text-model");
    textModelContainer.appendChild(textModel);

    for (let i = 0; i < quote.length; i++) {
        const letter = document.createElement('span');
        letter.classList.add('letter-model');
        letter.setAttribute("id", `letter${i}`);
        letter.dataset.spanIndex = `letter${i}`;
        letter.textContent = quote[i];
        textModel.appendChild(letter);
    };
};

let lettersIndex = 0;
let scoreCount = 0;
const scoreDisplay = document.getElementById('score');
const textArea = document.getElementById('textArea');
textArea.addEventListener('keydown', (e) => {
    sentenceChecker(e.key, e.target);
});

function reloadQuote() {
    lettersIndex = 0;
    function clearAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    clearAllChildren(textModelContainer);
    setTimeout(() => { textArea.value = ""; }, 100);
    quotesFetcher();
}

function sentenceChecker(key, textArea) {
    if (key === quote[lettersIndex] && textArea.value === quote.slice(0, lettersIndex)) {
        textArea.readOnly = false;
        document.getElementById('letter' + lettersIndex).classList.remove('incorrect');
        document.getElementById('letter' + lettersIndex).classList.add('correct');
        lettersIndex++;
        scoreCount++;
        // console.log(lettersIndex,scoreCount)
        scoreDisplay.textContent = scoreCount;
        if (lettersIndex == quote.length) {
            reloadQuote()
        }
    } else {
        document.getElementById('letter' + lettersIndex).classList.add('incorrect');
        textArea.readOnly = true;
    }
}

// TIMER
// ====================================
let timerCount = 60;
let timerSetime;
const timerDisplay = document.getElementById('timer')
function timerHnadler() {
    if (timerCount === 0) {
        textArea.disabled = true;
        scoreCount = 0;
        return
    } else {
        timerCount--;
        timerDisplay.textContent = timerCount;
        timerSetime =   setTimeout(() => {
            timerHnadler()
        }, 1000)
    }
}
timerHnadler()

// Restart
// =================================

function reloadGame() {
    textArea.disabled = false;
    clearInterval(timerSetime)
    timerDisplay.textContent = 60;
    scoreDisplay.textContent = 0;
    timerCount = 60;
    reloadQuote()
    setTimeout(() => {
        timerHnadler()
    },1000)
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        reloadGame();
    }
});

