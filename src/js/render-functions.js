const wordList = document.querySelector(".word-list");
const wordCount = document.querySelector(".word-count");

function renderWordList(words) {
    wordList.innerHTML = words
        .toSorted((a, b) => a.word.localeCompare(b.word))
        .map(item => {
        return `
            <li class="word-item" data-word="${item.word}">
                <span>${item.word}</span>
                <span class="translation">${item.translation}</span>
                <button class="delete-btn">✕</button>
            </li>
        `
    }).join("");

    updateWordCount(words.length);
}

function updateWordCount(count) {
    wordCount.textContent = count;
}

export { renderWordList, updateWordCount };