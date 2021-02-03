# Teamtris - Simple Tetris Game Playing With Partner
---

**프로젝트 명:** Teamtris

**클라이언트:** [client](client)

**서버:** [server](server)

**TODO:**
* ~메인화면 UI 구성 (ex: lobby, userlist, profile, chatbox...)~ [2021-01-10]
* ~회원가입 및 로그인 화면 UI 구성~ [2021-01-11]
* ~회원가입 기능 구현~ [2021-01-12]
* ~로그인 인증 및 인가 구현~ [2021-01-16]
* ~패스워드 암호화 적용~ [2021-01-16]
* ~클라이언트 입력 유효성 검증 구현~ [2021-01-17]
* 소켓을 이용한 room, userlist, chat 기능 구현 [95%]
* 테트리스 대기 화면 UI 구성 [80%]
* ~테트리스 연습모드(solo) 구현~ [2021-01-28]
* 테트리스 개인전(single) 구현 [60%]
* 테트리스 팀전(doubles) 구현
* 포인트 및 랭킹 시스템 구현

## Change Log
### [2021-01-07]
 
**Added**
* `express-generator`를 이용하여 기본적인 RESTful 서버 셋팅
* `create-react-app`를 이용하여 기본적인 클라이언트 사이드 셋팅

### [2021-01-08]
 
**Added**
* stylesheet 작업을 위한 `styled-components` 라이브러리 채택
* 현재 사용자 목록을 확인할 수 있는 기본적인 UI 구현

### [2021-01-09]
 
**Added**
* 로그인 중인 사용자의 정보를 확인할 수 있는 프로필 UI 구현
* 현재 생성된 게임 방을 확인할 수 있는 방 목록 UI 구현

### [2021-01-10]
 
**Added**
* 접속한 사람들끼리 대화를 나눌 수 있는 채팅방 UI 구현
* 보다 쉽게 UI를 디자인하기 위해서 `react-bootstrap` 라이브러리 채택
* 앞서 구현한 사용자 목록, 프로필, 생성된 방 목록, 채팅방 UI를 2 x 2 grid 구조로 Home Page UI에 배치
 
**Changed**
* `react-bootstrap`으로 채팅방과 생성된 방 목록 UI 디자인을 재수정

### [2021-01-11]
 
**Added**
* path에 따라 여러 페이지를 보여주기 위해 `react-router-dom` 라이브러리 채택하여 기본적인 Route 구조 설정
* 사용자 로그인에 필요한 UI와 페이지를 구현하고, 로그인 Form 아래에 회원가입 페이지로 넘어가는 버튼 추가
* 회원가입에 필요한 정보를 입력받을 수 있는 UI와 페이지 구현
 
**Changed**
* 사용자가 비로그인 상태일 시 기존의 프로필 UI에 로그인 페이지 이동 버튼이 나타나도록 수정

### [2021-01-12]
 
**Added**
* Mongo DB를 express에서 사용하기 위해 `mongoose` 라이브러리 채택
* 서버단에 입력받은 정보로 새로운 사용자를 추가하는 REST API 구현
* 클라이언트에서 서버단에게 API를 요청하기 위한 `axios` 설치
* 회원가입 폼의 사용자 생성 버튼 기능 구현
 
**Changed**
* 회원가입 폼의 `id`와 `passwordCheck`을 `userId`와 `passwordConfirm`으로 변경
* typescript에 최적화된 패키지 설정 및 파일 구조 재구성

### [2021-01-13]
 
**Added**
* Stateless한 사용자 인증 및 인가를 위해 `jsonwebtoken` 라이브러리 채택
* 로그인을 시도하면 jwt 토큰을 발급하고, 이 토큰을 통해 접근 권한을 인가할 수 있게 하는 API 구현
* 로그인 폼의 사용자 인증 후에 토큰 발급 기능 구현
 
**Changed**
* 서버단의 `routes` 폴더를 `api`로 변경
* typescript에 최적화된 패키지 설정 및 파일 구조 재구성

**Fixed**
* pm2 stop 기능을 하는 npm script의 잘못된 경로 수정

### [2021-01-14]
 
**Added**
* 새로고침이나 언마운트되는 경우에도 토큰을 가지고 있을 수 있도록 access token을 localStroage에 저장하도록 구현
* localStroage에 있는 토큰을 이용해 현재 이용중인 사용자를 식별하고 프로필 UI에 정보를 출력하도록 구현
 
**Changed**
* Mongoose DAO에 관련하여 callback 함수를 호출하는 방식을 Promise를 사용하는 방식으로 수정
* 토큰에 담겨진 _id값을 통해 현재 이용하고 있는 사용자 자신의 정보를 가지고 오는 서버단의 라우터 주소를 수정

**Fixed**
* Room, Chat, User 목록의 각 아이템에 key 값이 지정되지 않은 것을 수정
* access token을 주고 받을 때 x-access-token 헤더에 담아 보내던 것을 authorization 헤더에 담아 보내도록 수정

### [2021-01-15]
 
**Added**
* 상태를 보다 유연하고 편리하게 관리하기 위해서 `redux` `react-redux` `redux-thunk` 라이브러리 채택
* 액션 함수 생성 등의 기능을 제공하는 `typesafe-actions` 라이브러리 사용
* 디버그를 보다 직관적이고 효율적으로 하기 위해 `redux-devtools-extension` `redux-logger` 라이브러리 사용
 
**Changed**
* 토큰 소유자의 정보를 가져오는 showMe API의 라우팅 주소를 `/auth/me`에서 `/users/me`로 변경
* 내 정보를 가져오는 작업을 thunk 함수로 dispatch 하도록 변경
* 기존 방 목록, 유저 목록 등의 구조를 새롭게 리팩토링

**Fixed**
* localStorage의 토큰 정보를 불러오기 전에 axios 헤더에 연결하여 헤더의 access token 값이 undefined가 되는 문제 수정

### [2021-01-16]
 
**Added**
* 중복된 아이디 등 회원가입 관련한 오류 처리를 위한 error handler 추가
* 홈화면으로 갈 수 있는 로고 버튼과 사용자 드롭다운 버튼이 있는 상단 네비게이션 바 추가
* 비밀번호를 보다 안전하게 관리하기 위해 `bcrypt` 라이브러리 사용
 
**Changed**
* 회원가입과 로그인에서 비밀번호를 생성, 비교할 때 `bcrypt`로 비밀번호를 해시화하여 보안성을 높임

**Fixed**
* parseError에서 errmsg의 error keyword를 찾는 부분에서 발생하는 오류 수정

### [2021-01-17]
 
**Added**
* 회원가입 화면에서 각 필수 입력값이 누락되거나 요구 조건을 충족하지 않으면 사용자에게 feedback하는 label 추가
* 로그인 화면에서 아이디나 패스워드가 입력되지 않거나 입력된 값에 해당하는 계정이 없으면 오류창을 띄우도록 구현
 
**Changed**
* 네비게이션 바를 모든 페이지 상단에 노출되도록 수정

### [2021-01-18]
 
**Added**
* 소켓 통신을 위해 `socket.io` `socket.io-client` 라이브러리 추가
* 서버단과 클라이언트단 사이의 소켓 통신이 가능하도록 연결하고 socket event listener을 작성하여 채팅방 기능 구현
 
**Changed**
* react의 package.json의 proxy 기능으로 CORS 문제를 해결했던 것을 express에서 cors 미들웨어로 대처하도록 수정

### [2021-01-19]
 
**Added**
* 컴포넌트가 언마운트될때 socket listener도 제거되도록 구현
* socket listener을 구현하여 로그인한 사용자들의 목록을 userlist에서 확인할 수 있게 구현함
 
**Changed**
* 각 리스트에 관련된 컴포넌트에서 list.map()의 각 item의 key를 map 함수 내에서 제공하는 index 인수값으로 변경
* 기존에 profile 컴포넌트에서 getMeThunk를 dispatch하는 것을 NavBar에서 dispatch하도록 수정
* socket 관련 코드를 컴포넌트가 아닌 컨테이너에서 정의하여 컴포넌트에게 값을 전달하도록 변경

**Fixed**
* getmeThunk가 처음 마운트될 때만 dispatch되어 로그인을 해도 즉시 me 상태가 변경되지 않던 문제를 해결

### [2021-01-20]
 
**Added**
* 테트리스 대기방을 생성할 수 있는 dialog 추가
* 방 생성 dialog에 입력한 방 옵션을 토대로 실제 대기방 공간을 만들고 사용자에게 이를 알리는 기능을 구현
* 소켓의 disconnect listener을 추가하여 사용자가 teamtris 웹을 이탈했을 때 사용자를 userlist에서 제외하고 update하도록 구현
 
**Changed**
* 홈 화면의 UI를 컨테이너 간에 빈공간이 안보이도록 수정
* userlist에서 존재하지 않는 사용자를 제거하는 알고리즘을 수정

### [2021-01-21]
 
**Added**
* 현재 사용자가 참여중인 room에 대한 상태를 관리하기 위해 store에 추가
* 게임 대기방(로비)의 기본적인 UI 구현
* 사용자가 방을 만들면 해당하는 방 로비 화면으로 넘어가도록 구현

### [2021-01-22]
 
**Added**
* 만들어진 게임 방에 출입할 수 있도록 click event listener 및 socket listener 추가

**Changed**
* type, interface 요소들을 서버단과 클라이언트단 목적에 맞춰 이동 및 재구성
* 기존 grid layout 부분을 좀 더 효율적인 구조로 변경
* roomCreate라고 칭하던 요소를 createRoom으로 변경

**Fixed**
* 기존 `useEffect` 구문의 deps가 누락되었던 것을 수정
* 각 사용자의 id가 정상적으로 표시되지 않던 것을 수정
* 서버단과 클라이언트단 사이에 주고 받는 타입 변수때문에 서버단의 start script의 uri설정이 변경되어 발생하던 문제 수정

### [2021-01-23]
 
**Added**
* 테트리스 기능을 구현하기 위해 임시로 연습모드 페이지를 추가, 구체적인 기능은 이후에 구현할 예정

**Fixed**
* 서버단의 stop script의 uri설정의 경로가 잘못되었던 것을 수정

### [2021-01-24]
 
**Added**
* 테트리스 화면의 stage, cursor에 쓰일 state 관리 함수들을 모아놓은 custom hooks 추가
* 시작 버튼을 누르면 테트리스를 할 수 있는 기본적인 시스템 구현, 아직까지는 키보드로 블럭을 움직여 쌓아 올리는 것까지만 가능

**Changed**
* 테트리스 UI의 몇몇 styled 컴포넌트 이름을 수정하고 불필요하게 리렌더링되는 StateCell 컴포넌트를 `React.memo` 처리하여 최적화

**Fixed**
* L모양 블록의 색상이 잘못된 값으로 설정되어 있던 것을 수정

### [2021-01-25]
 
**Added**
* 테트리스 블록들이 시간에 따라 자동으로 떨어지도록 구현
* 시작 지점에 쌓인 블록들이 존재하면 게임 오버가 되도록 구현
* 쌓은 블록으로 한줄을 채우면 해당 줄을 없애도록 구현

### [2021-01-26]
 
**Added**
* 테트리스 블록들을 회전하는 시스템 추가

**Changed**
* 테트리스 블록들의 첫 형태를 공식룰에 맞게 변경
* 테트리스 화면 UI를 조금 수정

### [2021-01-27]
 
**Added**
* hard drop이 되는 위치에 테두리만 색상을 가지는 outline 블록 모양을 보여줘서 어디에 떨어지는지 직관적으로 파악이 가능하도록 구현
* 테트리스 기본 블록의 모양, 유형의 type 변수를 추가
* 현재 조작하는 블록을 나중에 사용하도록 hold할 수 있는 시스템 구현
* 조작 예정인 블록들을 미리 확인할 수 있도록 tetromino queue 시스템 구현

**Changed**
* 테트리스 화면 UI 변경

### [2021-01-28]
 
**Added**
* 테트리스 연습 페이지로 이동하는 버튼 추가
* 테트리스 조작법을 알려주는 컴포넌트 추가
* 게임 중 스코어와 깨트린 라인 수, 현재 레벨 수준이 어떤지 알려주는 컴포넌트 추가

**Changed**
* 테트리스 블럭이 떨어지는 속도를 현재 레벨에 비례하도록 변경

### [2021-01-29]
 
**Added**
* 게임 방 목록에서 각 방 블록 위에 마우스를 올리면 해당 블록을 강조하도록 구현
* 게임 로비 화면에서 방장 개념과 준비/시작 시스템을 추가
* 참여자 수 체크를 서버 측에서도 검사하도록 구현

**Changed**
* 소켓 리스너로 발생하는 각각의 이벤트들은 목적에 맞는 target room에게만 전해지도록 수정

### [2021-02-01]
 
**Added**
* room 상태가 게임 중인 방인지 대기 방인지 식별하기 위한 isStart 속성 추가
* 개인전 게임 화면을 보여주기 위한 기본적인 UI 구현

**Changed**
* 연습모드 UI 스타일링 특정 요소를 page에서 다루도록 수정
* 기존 Player 타입의 이름을 WaitingPlayer으로 바꾸고, master 속성을 삭제 및 isReady isMaster 속성 추가

### [2021-02-02]
 
**Added**
* 테트리스 stage 크기를 유동적으로 조절하기 위해 size prop option을 추가
* game page에서 다른 player들의 stage를 확인할 수 있게끔 구현

**Changed**
* useStage hook에 있던 updateState와 sweepRow 함수를 컨테이너로 가져옴

### [2021-02-03]
 
**Added**
* 상대방의 방해 공격을 구현하기 위해 garbage bar 컴포넌트를 구현하여 테트리스 컨테이너에 추가
* 사용자가 테트리스 게임 중에 라인 클리어를 할 경우, 무작위의 한 상대방에게 garbage line 공격을 하도록 구현
