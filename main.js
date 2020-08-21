
const https = require('https');
const fs = require('fs');

let funcs = {read: read, write: write};

function read(file) {
    fs.readFile(file + '.json', 'utf-8', function(error, text) {
        if (error) {
            throw error;
        }
        console.log(JSON.parse(text));
    });
}

function write(file) {
    const app_id = 'your_app_id';
    const app_key = 'your_app_key';
    const wordId = file;
    const fields = "definitions";
    const strictMatch = "false";
    const options = {
        host: 'od-api.oxforddictionaries.com',
        port: '443',
        path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
        method: "GET",
        headers: {     'app_id': app_id,     'app_key': app_key   }
    };

    https.get(options, (resp) => {
        let body = '';
        resp.on('data', (d) => {
            body += d;
        });
        resp.on('end', () => {
//        let parsed = JSON.stringify(body);
            let parsed = body;
//            console.log(parsed);
            console.log(JSON.parse(parsed));
            fs.writeFile(file + '.json', parsed, function(error) {
                if (error) {
                    console.log('error ', error);
                } else {
                    console.log('done');
                }
            });
        });
    });
}

module.exports = funcs;
