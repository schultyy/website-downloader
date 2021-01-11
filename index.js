const fetch = require('node-fetch');
const TurndownService = require('turndown');

const turndownService = new TurndownService();

fetch('https://github.com/')
    .then(res => res.text())
    .then(body => {
        const markdown = turndownService.turndown(body);
        console.log(markdown)
    })
    .catch((err) => console.error(err));
