const fs = require("fs");
const os =  require("os");

console.log(os.cpus().length);

//synchronous call
//blocking
// fs.writeFileSync('./test.txt', "Hey There!")

//asynnc
// non blocking
//fs.writeFile('./test.txt', "Hello World async", (err) => {});

// const res = fs.readFileSync("./contact.txt", "utf-8" );

// console.log(res);

// fs.readFile("./contact.txt", "utf-8" , (err, result) => {
//     if(err){
//         console.log("Error", err);
//     } else{
//         console.log(result);
//     }
// });


// fs.appendFileSync("test.txt", new Date().getDate().toLocaleString());


//default thread pool  size = 4

//maximum size = max size of cpu