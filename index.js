const fs = require('fs');
const fetch = require('node-fetch');
const TurndownService = require('turndown');
const { program } = require('commander');
program.version('0.0.1');

program
  .requiredOption('-w, --website <url>', 'website to fetch and convert')
  .option('-f, --filename <filename>', 'Custom filename for output file');

program.parse(process.argv);

const filename = program.filename ? program.filename : "website.md";

const turndownService = new TurndownService();

fetch(program.website)
    .then(res => res.text())
    .then(body => {
        const markdown = turndownService.turndown(body);
        return Promise.resolve(markdown);
    })
    .then(markdown => {
        fs.writeFile(filename, markdown, function (err) {
            if (err) return Promise.reject(err);
            console.log('Wrote file.');
        });
    })
    .catch((err) => console.error(err));
