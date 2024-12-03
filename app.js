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
const textArea = document.getElementById('textArea');
textArea.addEventListener('keydown', (e) => {
    // console.log(e.target.value, e.key,quote[lettersIndex]);
    sentenceChecker(e.key, e.target);
});

function sentenceChecker(key, textArea) {
    if (key === quote[lettersIndex] && textArea.value === quote.slice(0, lettersIndex)) {
        textArea.readOnly = false;
        document.getElementById('letter' + lettersIndex).classList.remove('incorrect')
        document.getElementById('letter' + lettersIndex).classList.add('correct')
        lettersIndex++;
        if (lettersIndex == quote.length) {
            lettersIndex = 0;
            function clearAllChildren(element) {
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                }
            }
            clearAllChildren(textModelContainer);
            setTimeout(() => {textArea.value = "";},100);
            quotesFetcher();
        }
    } else {
        document.getElementById('letter' + lettersIndex).classList.add('incorrect');
        textArea.readOnly = true;
    }
}







