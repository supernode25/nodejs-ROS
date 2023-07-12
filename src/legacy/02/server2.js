// 230709
const express = require("express");
const app = express();

let posts = [];

// 클라이언트로부터 받은 http 요청 메시지 형식에서 body 데이터를 해석하기 위해 사용
// json 방식으로 요청을 받기 위한 함수(application/json)
app.use(express.json());

// 클라이언트로부터 받은 http 요청 메시지 형식에서 body 데이터를 해석하기 위해 사용
// x-www-form-urlencoded 형태의 데이터를 받기 위한 함수(application/x-www-form-urlencoded)
app.use(express.urlencoded({extended: true}));

/*
Create: 데이터 생성 (POST)
Read: 데이터 조회 (GET)
Update: 데이터 수정 (PUT)
Delete: 데이터 삭제 (DELETE)
*/

// posts 배열에 담긴 게시글 목록을 JSON 형태로 반환
app.get("/", (request, response) => {
    response.json(posts);
});

app.post("/posts", (request, response) => {
    // 요청을 보내는 body에 title, name, text가 있어야 함
    const {title, name, text } = request.body;

    // 요청자가 보낸 title, name, text를 하나로 묶어 posts의 요소로 추가
    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date()});
    response.json({title, name, text});
});

// http://localhost:3000/posts?id=1003 라고 작성하면 id가 3인 배열 요소를 찾아서 삭제함
app.delete("/posts/:id", (response, request) => {
    const id = request.params.id;           

    
    /* [filter 함수 예제]
    const numArr = [1, 2, 3];
    const oddArr = numArr.filter((element)=>element % 2 !== 0);
    console.log(oddArr);    // [1, 3]
    */

    // ex> 1001, 1002, 1003
    const filteredPosts = posts.filter((post) => post.id !== +id);  // '+id' 는 string으로 넘어오는 걸 number 타입으로 바꿔줌
    
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;
    if (isLengthChanged) {
        response.json("OK");
        return;
    }
    response.json("NOT CHANGED");
});

app.listen(3000, () => { 
    console.log("welcome posts START!");
});