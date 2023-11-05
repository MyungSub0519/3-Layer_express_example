## Folder Naming Rule

- 가급적 명사를 사용합니다.

- 대주제-소주제 형태로 구성합니다. (디렉토리 구조 또한 마찬가지)

- 영문 소문자로만 구성합니다.

- 가급적 특수문자와 공백을 사용하지 않습니다.

- 만약 단어 구분 등으로 공백 대신 '하이픈( - )'만 사용합니다.


## File Naming Rule

- snake_case의 spinal_case를 사용합니다. ( 각 단어의 앞글자를 소문자로 표기하는 것 )
    - 고유명사가 대문자를 표기하는 경우 대문자로 표기합니다.

- 대주제_소주제 형태로 구성합니다.

- 공백은 '언더바( _ )' 로 연결합니다.

- 종속된 연관 구분자는 '하이픈( - )' 으로 연결합니다.

## Variable Naming Rule

- 변수, 함수명은 camelCase를 사용합니다.

- 클래스는 PascalCase를 사용합니다.

- 환경변수는 모두 대문자를 쓰는 SNAKE_CASE를 사용합니다.

- method명은 가급적 동사를 사용, 액션_대상_조건 형태로 작성
    - controller
        - HTTPmethod_대상_조건
            - ex.) getBoards -> 전체보드
            - ex.) getBoardById -> 특정보드
            - ex.) postBoard -> 보드 작성
            - ex.) deleteBoard -> 보드 삭제

    - service
        - 특정동작_대상_조건
            - ex.) createBoard -> 보드 작성
            - ex.) loginAccount, logoutAccount, ...
            - ex.) findBoard -> 특정 보드 조회
            - ex.) update = edit, delete = remove로 치환(model이나 controller와 겹치지 않기 위해)
                - ex.) removeBoard -> 보드 삭제

    - model
        - SQL명령어_대상_조건
            - ex.) selectBoard -> 특정 보드 조회
            - ex.) insertBoard -> 보드 생성
            - ex.) updateBoard -> 보드 변경
            - ex.) deleteBoard -> 보드 삭제