const fs = require("fs");


//synchronous call
// fs.writeFileSync('./test.txt', "Hey There!")

//asynnc

//fs.writeFile('./test.txt', "Hello World async", (err) => {});

const res = fs.readFileSync("./contact.txt", "utf-8" );

console.log(res);

fs.readFile("./contact.txt", "utf-8" , (err, result) => {
    if(err){
        console.log("Error", err);
    } else{
        console.log(result);
    }
});


fs.appendFileSync("test.txt", new Date().getDate().toLocaleString());