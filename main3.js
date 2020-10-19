
const https = require('https');
const fs = require('fs');

let funcs = {read: read, write: write};

function read(file, callback) {
    fs.readFile(file + '.json', 'utf-8', function(error, text) {
        if (error) {
//            throw error;
            console.log(error);
//            return null;
///            callback(null, null);
            callback(true);
//            callback(false);
//            f(null);
//            return null;
//            return false;
        } else {
//            console.log('Fine');
///            callback(true);
            callback(null, text);
            console.log(JSON.parse(text));
            console.log('Fine');
//            return true;
        }
    });
//    callback();
}

function write(file, callback) {
    const app_id = '2930d46b';
    const app_key = 'f63042a0812d675e8d074f25a9d790d8';
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
            let parsed = body;
            console.log(JSON.parse(parsed));
            fs.writeFile(file + '.json', parsed, function(error) {
                if (error) {
                    console.log('error ', error);
                } else {
                    callback();
                    console.log('done');
//                    return parsed;
                }
            });
        });
    });
//    callback();
}

module.exports = funcs;