const http = require('http');
const fs = require('fs');
const path = require('path');
const cors_proxy = require('cors-anywhere');

const host = 'localhost';
const port = 8080;
const proxyPort = 8081; // Port for the CORS Anywhere proxy server

// Start the CORS Anywhere proxy server
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(proxyPort, host, () => {
    console.log(`CORS Anywhere proxy server is running on ${host}:${proxyPort}`);
});

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Serve index.html by default
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        // Handle other requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the HTTP server
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
