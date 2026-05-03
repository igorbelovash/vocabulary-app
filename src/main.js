import { translateWord } from './js/translate-api';
import { renderWordList, updateWordCount } from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const STORAGE_KEY = 'vocabulary-words';

const formEl = document.querySelector(".form");
const searchEl = document.querySelector(".search");
const wordList = document.querySelector(".word-list");

formEl.addEventListener("submit", handleSubmit);
searchEl.addEventListener("input", (event) => {
    const query = event.target.value;
    app.searchWords(query);
})

class VocabularyApp {
    constructor() {
        this.words = []
    }

    addWord(word, translation) {
        this.words.push({
            word,
            translation
        });

        this.saveToStorage();
        renderWordList(this.words);
    }

    deleteWord(word) {
        const index = this.words.findIndex(item => item.word === word);
        if (index !== -1) {
            this.words.splice(index, 1);
        }

        renderWordList(this.words);
    }

    searchWords(query) {
        const filter = this.words.filter(item => item.word.toLowerCase().includes(query.toLowerCase()));
        renderWordList(filter)
    }

    saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.words));
    }

    loadFromStorage() {
        this.words = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
        renderWordList(this.words);
    }
}

const app = new VocabularyApp();
app.loadFromStorage();

wordList.addEventListener("click", handleDelete);

function handleSubmit(event) {
    event.preventDefault();

    const word = event.target.elements.word.value;
    translateWord(word)
        .then((data) => {
            if (!data) {
                iziToast.show({
                    color: '#EF4040',
                    messageColor: '#FAFAFB',
                    message: 'Translation not found',
                });
                return;
            }
            app.addWord(word, data);
        })
        .catch(error => {
            iziToast.show({
                color: '#EF4040',
                messageColor: '#FAFAFB',
                message: 'An error occurred while translating the word',
            });
        })
        .finally(() => {
            event.target.reset();
        })
}

function handleDelete(event) {
    if (event.target.classList.contains("delete-btn")) {
        const wordItem = event.target.closest(".word-item");
        const wordId = wordItem.dataset.word;
        app.deleteWord(wordId);

        app.saveToStorage();
    }
}

