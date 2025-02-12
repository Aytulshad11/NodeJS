// to create a http server
const http = require('http');
const express = require("express");
// const fs = require("fs");
// const url = require("url");
const app = express();

app.get("/", (req, res) => {
    return res.send("Hello from home page");
})
app.get("/about", (req, res)=> {
    return res.send("Hello from about page");
})

const server = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Recieved\n`
   // console.log("NEw req recieved");
  //  console.log(req.headers);
    //res.end("Hello from server!");
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hello! ${username}`);
                break;
            default:
                res.end("404 Not Found");
        }
    })
});

const myServer = http.createServer(app);
myServer.listen(3000, () => console.log("server started!"));