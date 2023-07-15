/*

REST API 원칙
자원을 URL에 표현하고 자원을 가져오는 행위를 HTTP 메서드로 표현하는 규칙이다.

*/

const express = require("express");
const app = express();

//post에 빈 리스트를 할당, 게시글을 의미함
// 글 삭제 시 삭제된 목록으로 다시 재할당하기 때문에 let으로 지정
let posts = [];

// express.json() 미들웨어를 활성화함
// app.use()는 미들웨어를 사용할 때 사용하는 함수임
// req.body를 사용하려면 json 미들웨어를 사용해야 함
// 사용하지 않으면 undefined로 나옴
app.use(express.json());

// post요청이 컨텐츠 타입 - application/x-www-form-urlencoded인 경우 파싱을 위해 사용
// application/x-www.form-urlencoded타입이란 body에 키=값&키2=값2 같은
// 키 조합형태의 데이터를 말함
app.use(express.urlencoded({extended: true}));


// localhost:3000으로 get요청이 오는 경우 콜백 함수를 실행
// res.end()함수의 경우 인자로 문자열과 바이트 버퍼 형식만 넣을 수 있기에
// res.json()함수를 사용해 리스트와 JSON 데이터를 처리한다
app.get("/", (req, res) => {
    res.json(posts);
});

// localhost:3000으로 POST요청이 오는 경우 콜백함수 실행
app.post("/posts", (req, res) => {

    console.log(typeof req.body);

// 요청의 body에 담겨진 title, name, text 값을 각 변수로 할당함
// 객체 타입은 비구조화 할당이 가능하므로 여러 요소를 여러 변수에 한번에 할당 할 수 있음
// title=타이틀&name=이름&text=내용 형식 데이터를 urlencoded 미들웨어가
// 객체로 변경해서 req.body에 추가함
    const {title, name, text} = req.body;


// 게시글을 게시판에 추가함
// 아이디, 제목, 이름, 내용, 생성일시를 입력
    posts.push({id: posts.length + 1, title, name, text, createdDt: Date() });
});

app.delete("/posts/:id", (req, res) => {

// id변수 요청의 path에 할당된 변수 id를 할당
// app.delete의 라우팅 규칙에:id 부분에 데이터가 들어오면 문자열 타입으로 params.id에 할당한다.
    const id = req.params.id;

// 게시판의 글에서 id 이외의 글들만 뽑아서 filteredPosts에 다시 할당
// +id는 문자열인 id를 숫자형으로 변경한다는 뜻임
    const filteredPosts = posts.filter((post) => post.id !== +id);

// 기존 게시판의 글과 필터링된 게시판의 글의 길이가 다른 경우 게시글이 삭제되었는지 판단 
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;

// post에서 게시글이 삭제된 경우 OK를 응답하고 return을 해서 콜백 함수를 빠져나감 -> 빠른 반환
    if (isLengthChanged) {
        res.json("OK");
        return;
    }
// 게시글에 변경이 없는 경우는 NOT CHANGED 메세지를 응답한다.
    res.json("NOT CHANGED");
});

app.listen(3000, () => {
    console.log("welcome board START!");
})






