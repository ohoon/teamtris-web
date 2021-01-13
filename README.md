# Teamtris - Simple Tetris Game Playing With Partner
---

**프로젝트 명:** Teamtris

**클라이언트:** [client](client)

**서버:** [server](server)

**TODO:**
* ~메인화면 UI 구성 (ex: lobby, userlist, profile, chatbox...)~ [2021-01-10]
* ~회원가입 및 로그인 화면 UI 구성~ [2021-01-11]
* ~회원가입 기능 구현~ [2021-01-12]
* 로그인 인증 및 인가 구현 [50%]
* 패스워드 암호화 적용
* 클라이언트 입력 유효성 검증 구현
* 소켓을 이용한 room, userlist, chat 구현
* 테트리스 대기 화면 UI 구성
* 테트리스 연습모드(solo) 구현
* 테트리스 단식모드(1:1) 구현
* 테트리스 복식모드(2:2) 구현
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
