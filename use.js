
const funcs = require('./main');

let args = process.argv;

function show(string) {
    let arg = [];
    for (let i = 2; i < string.length; i++) {
        arg.push(args[i]);
    }
    if (arg[0] == 'read') {
        funcs.read(arg[1]);
    }
    if (arg[0] == 'write') {
        funcs.write(arg[1]);
    }
}

show(args);
