/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 * 
 * Sur ce... Amusez-vous bien ! 
 */
let startTime = null, previousEndTime = null;
let currentCharIndex = 0;
const wordsToType = [];

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const results = document.getElementById("results");
const firstPage = document.getElementsByClassName('select')[0];
const selectTime = document.getElementById('selectTime');
const timerDisplay = document.getElementById("timer");



const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};



// Generate a random word from the selected mode
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// const selectTime = (time)=>{
//     return timeleft[time]
// }

// Initialize the typing test
let time;
const startTest = () => {
    time = selectTime.value
    timerDisplay.textContent = "Temps : " + time + "s";
    wordsToType.length = 0; // Clear previous words
    wordDisplay.innerHTML = ""; // Clear display
    // currentCharIndex = 0;
    startTime = null;
    // previousEndTime = null;
    // alert(time);

    test();
    firstPage.style.display = 'none'

    wordDisplay.children[0].classList.add("cursor");

};


const test = (wordCount = 50) => {

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        for (let i = 0; i < word.length; i++) {
            const span = document.createElement("span");
            span.textContent = word[i];
            span.classList.add("letter");
            wordDisplay.appendChild(span);
        }

        const space = document.createElement("span");
        space.textContent = " ";
        space.classList.add("letter");
        wordDisplay.appendChild(space);

    });

    wordDisplay.value = "";
    results.textContent = "";
}
let stop = 1
const counDown = () => {
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            timerDisplay.textContent = `Temps : ${time}s`;
        }
        else {
            endTest();
        }
    }, 1000);
}


// Start the timer when user begins typing
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

// Calculate and return WPM & accuracy
let wpmResults = [];
let accuracyResults = [];
const getCurrentStats = () => {
    const elapsedTime = (Date.now() - selectTime.value) / 1000; // Seconds
    const wpm = (wordsToType[currentCharIndex].length / 5) / (elapsedTime / 60); // 5 chars = 1 word
    const accuracy = (wordsToType[currentCharIndex].length / wordDisplay.value.length) * 100;

    wpmResults.push(wpm)
    accuracyResults.push(accuracy)

    return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
};

// Move to the next word and update stats only on spacebar press
document.addEventListener("keydown", (event) => {
    if (!startTime) startTime = Date.now();

    const letters = document.getElementsByClassName('letter');
    if (currentCharIndex >= letters.length) return;

    const currentSpan = letters[currentCharIndex];
    const expectedChar = currentSpan.textContent;

    if (event.key.length === 1 || event.key === " ") {
        if (event.key === expectedChar) {
            currentSpan.style.color = 'green';
        }
        else {
            currentSpan.style.color = 'red';

        }

        if (stop === 1) {
            counDown();
            stop--;

        }

        currentSpan.classList.remove("cursor");

        currentCharIndex++;


        if (currentCharIndex < letters.length) {
            letters[currentCharIndex].classList.add("cursor");
        }

        if (currentCharIndex + 50 >= letters.length) {
            test();
        }
    }

});

// -------------------------------------------------------------- Avarage----------------------------------------------------------//

const wpmAverage = (wpmResults) => {
    let somme = 0
    for (let element of wpmResults) {
        somme += element;
    }

    return somme / wpmResults.length;
}
const accuracyAverage = (accuracyResults) => {
    let somme = 0
    for (let element of accuracyResults) {
        somme += element;
    }

    return somme / accuracyResults.length;
}

// finish test
const finish = () => {

}
// ---------------------------------------------------------------------------------------------------------------------------------//

// Highlight the current word in red
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    if (currentCharIndex < wordElements.length) {
        if (currentCharIndex > 0) {
            wordElements[currentCharIndex - 1].style.color = "black";
        }
        wordElements[currentCharIndex].style.color = "black";
    }
};

// Event listeners
// Attach `updateWord` to `keydown` instead of `input`
// document.addEventListener("keydown", (event) => {
//     // console.log(event.key)
//     // startTimer();
//     updateWord(event);
// });
modeSelect.addEventListener("change", () => startTest());

// Start the test
// startTest();


// Finish the test
// finichTest()

