require('http').createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Hello World (node server)</h1>');
}).listen(3003);
