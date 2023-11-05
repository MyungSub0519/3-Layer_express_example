# API_URL

## URL Endpoint

### 유저 관련

| HTTP Method | URL                            | Desc                 |
|-------------|--------------------------------|----------------------|
| GET         | v1/users                       | 전체 유저 조회        | 
| POST        | v1/users                       | 유저 생성(=회원가입)  |
| GET         | v1/users/{user-code}           | 특정 유저 정보 조회   | 
| PUT         | v1/users/{user-code}           | 특정 유저 이름 수정   | 
| DELETE      | v1/users/{user-code}           | 특정 유저 탈퇴        | 
| GET         | v1/accounts                    | 전체 계정 정보 조회   | 
| GET         | v1/accounts/{user-code}        | 특정 계정 정보 조회   | 
| PUT         | v1/accounts/{user-code}        | 계정 정보 수정        |
| POST        | v1/accounts/{user-code}/login  | 로그인               |
| POST        | v1/accounts/{user-code}/logout | 로그아웃             |

- users는 민감한 정보를 담지 않습니다. <-> accounts는 패스워드와 같은 민감한 정보를 동봉합니다.

### 게시판 관련
| HTTP Method | URL                               | Desc               |
|-------------|-----------------------------------|--------------------|
| GET         | v1/boards                         | 전체 게시글 조회    |
| POST        | v1/boards                         | 게시글 작성         |
| GET         | v1/boards/{board-code}            | 특정 게시글 조회    | 
| PUT         | v1/boards/{board-code}            | 특정 게시글 수정    |
| DELETE      | v1/boards/{board-code}            | 특정 게시글 삭제    |
| POST        | v1/boards/{board-code}/recommend  | 특정 게시물 추천    |