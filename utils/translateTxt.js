const fetch = require('cross-fetch');
const API = 'https://api-free.deepl.com/v2/translate';
const apiKey = '85038153-8635-71fb-967d-7e8e2d3ae7fb:fx';

let translateTxt = (text, inputlang, outputlang) => {
    
    let status = ''
    let params = {
        'text': text, //'你好嗎? 我要吃你的孩子。我可以嗎?',
        'target_lang': outputlang
    }

    if(inputlang != '') params['source_lang'] = inputlang;

    return fetch(API, {
        method: 'POST',
        headers: {
            'Authorization': 'DeepL-Auth-Key ' + apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(params)
    }).then(res => {
        status = res.status;
        return res.json();
    }).then(res => {
        if (status >= 400 && status <= 600) {
            console.log("Error: ", res);
        } else {
            console.log(res);
            return res
        }
    }).catch(err => {
        console.log(err)
    });
}

module.exports = { translateTxt };