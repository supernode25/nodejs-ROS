// 230708
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
    // http://localhost:3000/user?name=bjSun&age=30&company=coga

    /*
    const queries = {
        name: 'bjSun',
        age: '30',
        company: 'coga'
    }
    */
    const queries = url.parse(arg1.url, true).query;
    // console.log(queries);
    
    arg2.end(
        // '', 0, false, undefined, null
        `[user] name :
        ${(queries.name) ? queries.name : 'No Name'},
        age : ${(queries.age) ? queries.age : 'No Age'}`
    );
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