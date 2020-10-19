
const fs = require('fs');
const WebSocket = require('websocket').server;
const http = require('http');

//const funcs = require('./main2');
const funcs = require('./main3');

const index = fs.readFileSync('./dictionary.html', 'utf-8');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(index);
});

server.listen(8000, () => {
    console.log('listening port 8000');
});

const ws = new WebSocket({
    httpServer: server,
    autoAcceptConnections: false
});

const clients = [];

ws.on('request', req => {
    const connection = req.accept('', req.origin);
    clients.push(connection);
    console.log('connected ' + connection.remoteAddress);
    connection.on('message', message => {
        const dataName = message.type + 'Data';
        const data = JSON.parse(message[dataName]).value;
        console.dir(message);

        console.log('received ' + data);
        clients.forEach(client => {
            if (connection == client) {
///                let local = read2('./' + data + '.json', client);
///                if (!local) {
///                    console.log('file not found');

                    const read = funcs.read;
                    const write = funcs.write;

/*                    let w4 = wait4(funcs.write('./' + data));
                    w4.then(value => {
                        console.log('this and 2');
                        console.log(value);
                        send(client, value);
                        console.log('fine2');
                    });*/

                    const first = read('./' + data, function(err, text) {
                        console.log(err);
                        console.log(typeof err);
///                        send(client, text);
                        if (err) {
                            console.log(err);
                            console.log(typeof err);

                            write('./' + data, function () {
                                read('./' + data, function (err, text) {
                                    console.log('all done');
                                    send(client, text);
                                });
                            });
                        } else {
                            send(client, text);
                        }

                    });

///                }
            }
        });
    });
    connection.on('close', (reasonCode, description) => {
        console.log('disconnected ' + connection.remoteAddress);
        console.dir({reasonCode, description});
    });
});

function read2(file, client) {
    fs.readFile(file, 'utf-8', function(error, data) {
        if (error) {
            console.log('Error:', error);
            return null;
        } else {
            console.log('this');
            send(client, data);
        }
    });
}

function send(client, data) {
    client.send(data);
    console.log('sending:', data);
}
/*
const first = read(file, function f() {
    if (!first) {
        console.log('not');
        write(file, function () {
            read(file, function () {
                console.log('all done');
            });
        });
    }
});
*/





