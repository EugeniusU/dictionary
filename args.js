const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const funcs = require('./main');

const arg = process.argv[2];
console.log(arg);


function args(n, command) {
    if (n == 0) {
        rl.close();
        return null;
    }
    rl.question('Waiting for word ', function(word) {
        if (word == 'end') {
            rl.question('you want to exit? yes or no', function(answer) {
                if (answer == 'yes') {
                    rl.close();
                    return null;
                }
            });
        }
        funcs[command](word);
        return args(n - 1, command);
    });
}

args(100, arg);     // this '100' for testing, plain recursion

/* - this arg must be one of 'write' or 'read' command, getting from node's command prompt
   - for example, run 'main.js read' will meaning args(100, 'read') and apply function read from required main.js
*/
