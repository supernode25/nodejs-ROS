// 230707
const url = require("url");
const http = require('http');

const parameterToServer = (requset, response) => {

    const path = url.parse(requset.url, true).pathname;
    response.setHeader("Content-Type", "text/html");
   
    if (path ==  "/user") {
        userFunction(requset, response);
    }

    else if (path == "/feed") {
        feedFunction(requset, response);
    }
    
    else {
        elseFunction(requset, response);
    }
};

const userFunction = (arg1, arg2) => { 
    arg2.end("[user] name : andy, age : 30");
}

const feedFunction = (arg1, arg2) => {
    arg2.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    </ul>`);
}

const elseFunction = (arg1, arg2) => {
    arg2.statusCode = 404;
    arg2.end("404");   
}


const server = http.createServer(parameterToServer);
server.listen("3000", () => console.log("OK 서버 시작!"));