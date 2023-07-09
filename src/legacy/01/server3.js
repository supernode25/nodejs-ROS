// 230709
const url = require("url");
const http = require('http');

const parameterToServer = (requset, response) => {

    const path = url.parse(requset.url, true).pathname;
    response.setHeader("Content-Type", "text/html");
    // charset 문제 해결 필요
   
    // if (path ==  "/user") { userFunction(requset, response); }
    // else if (path == "/feed") { feedFunction(requset, response); }
    // else { elseFunction(requset, response); }

    // `urlMap` 객체 안에서 path라는 속성이 있는지 찾는 것
    if (path in urlMap) {
        urlMap[path](request, response);
    }
    else {
        elseFunction(requset, response);
    }
};


// Key-Value 구조를 Object로 구현
const urlMap = {
    "/": (request, response) => response.end("HOME"),
    "/user": userFunction,
    "/feed": feedFunction,
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