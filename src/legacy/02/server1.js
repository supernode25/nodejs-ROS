// 230709
const url = require('url');

const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, ()=>{ console.log(`SERVER 시작: ${PORT}`); });

const userFunction = (arg1, arg2) => { 
    // http://localhost:3000/user?name=bjSun&age=30&company=coga
    const queries = url.parse(arg1.url, true).query;
    arg2.json(
        `[user] name : `
        + `${(queries.name) ? queries.name : 'No Name'}, `
        + `age : ${(queries.age) ? queries.age : 'No Age'}`
    );
}

const feedFunction = (arg1, arg2) => {
    arg2.json(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    </ul>`);
}

app.get("/", (request, response)=>{ response.end('HOME'); });
app.get("/user", userFunction);
app.get("/feed", feedFunction);
