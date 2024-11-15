const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: New Req Recieved`;
    fs.appendFile('log.txt', log + '\n', (err, data) => {
        res.end("Hello From Server");
    });
    // console.log(req.headers);
    
});

myServer.listen(8000, ()=> console.log("Server Started!"));

