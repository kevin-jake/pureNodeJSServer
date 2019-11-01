const http = require('http');

const url = require('url')

function handler(req, res) {
    const parsedURL = url.parse(req.url, true)

    res.setHeader('x-server-date', new Date());
    console.log(parsedURL)
    if (parsedURL.pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.write('Hello World');
        return res.end();
    }
    else if (parsedURL.pathname.startsWith('/user/')) {
        const regex = new RegExp('\/user\/(.+)')
        const matches = regex.exec(parsedURL.pathname);
        if (!matches || !matches[1]) {
            res.writeHead(400, { 'Content-type': 'text/plain' });
            return res.end();
        }
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.write(`Userprofile of ${matches[1]}`)
        return res.end();
    }
    else if (parsedURL.pathname === '/time') {
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.write(new Date().toString());
        return res.end();
    }
    else if (parsedURL.pathname === '/hello') {
        const name = parsedURL.query.name;
        if (!name) {
            res.writeHead(400, { 'Content-type': 'text/plain' });
            return res.end();
        }
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.write(`Hello ${name}`)
        return res.end();
    }
    else {
        res.writeHead(404, { 'Content-type': 'text/plain' })
        return res.end();
    }
}

const server = http.createServer(handler);

server.listen(3000);