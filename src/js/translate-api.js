import axios from 'axios';

const url = "https://api.mymemory.translated.net/get?";

function translateWord(word) {
    return axios.get(url, {
        params: {
            q: word,
            langpair: 'en|ru'
        }
    })
    .then(({ data }) => {
        return data.responseData.translatedText;
    })
}

export { translateWord };