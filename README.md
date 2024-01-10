# 📚 Refresh Bookstore
![ezgif-5-985c54e5cd](https://github.com/refresh-bookstore/refresh-bookstore/assets/51044545/0c23ba4e-ffc3-4fe3-b49f-08fb9f7ce65e)



## 시스템 아키텍처
![image](https://github.com/refresh-bookstore/refresh-bookstore/assets/51044545/c0f47b2b-68a0-4d25-a405-269596150458)


## 🛠️ Tech Stack

![Programming Languages and Frameworks](https://img.shields.io/badge/-Programming%20Languages%20and%20Frameworks-8A2BE2?style=for-the-badge&logo=appveyor&logoColor=white)<br>
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ExpressJS](https://img.shields.io/badge/ExpressJS-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=ejs&logoColor=white)](https://ejs.co/)
[![VanillaJS](https://img.shields.io/badge/VanillaJS-F0DB4F?style=for-the-badge&logo=javascript&logoColor=white)](http://vanilla-js.com/)

![Database and ORM](https://img.shields.io/badge/-Database%20and%20ORM-FF4500?style=for-the-badge&logo=redis&logoColor=white)<br>
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TSOA](https://img.shields.io/badge/TSOA-10B981?style=for-the-badge&logo=typescript&logoColor=white)](https://tsoa-community.github.io/docs/)

![Infrastructure and Deployment](https://img.shields.io/badge/-Infrastructure%20and%20Deployment-1E90FF?style=for-the-badge&logo=azure-devops&logoColor=white)<br>
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Oracle Cloud Infrastructure](https://img.shields.io/badge/Oracle_Cloud_Infrastructure-F80000?style=for-the-badge&logo=oracle&logoColor=white)](https://www.oracle.com/cloud/)
[![Caddy](https://img.shields.io/badge/Caddy-00ADD8?style=for-the-badge&logo=caddy&logoColor=white)](https://caddyserver.com/)

![Other Tools](https://img.shields.io/badge/-Other%20Tools-32CD32?style=for-the-badge&logo=nuget&logoColor=white)<br>
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)


```bash
# 로컬 환경에서 커밋 템플릿 적용
git config --local commit.template .gitmessage.txt

# 커밋 템플릿으로 커밋
git commit
```

## 🌳 기존 프로젝트의 문제점 🌳

- MongoDB는 주문관리의 무결성을 보장하지 못합니다. RDBMS로 Migration하여, 무결성을 최대한 보장하고자 합니다.
- token과 session 방식으로 혼용된 인증방식 단일화가 필요합니다.
- 비즈니스 로직 분리 / Repository 패턴과, Service, Controller로 분리하고, 가독성을 위해 DTO를 사용하고자 합니다.

## ERD

## 🌳 Refresh Bookstore로 Refresh하러 오세요. 🌳

- Refresh Bookstore는 개발자와 개발을 공부하는 학생들이 IT 관련 서적을 구매할 수 있는 플랫폼입니다!
- 개발 공부를 시작하기 위해, 새로운 언어와 지식을 배우기 위해, **Refresh하기 위해** 책을 구매할 수 있는 곳, **Refresh Bookstore** 입니다
  <br>
  <br>

# &ensp;1. 서비스 소개

- 기술 스택: VanillaJS, Express.js, MongoDB, Docker, PM2
- IT 관련 서적 정보를 제공하며, 사용자들은 책을 검색하고, 장바구니에 담고, 구매할 수 있습니다.

<br>


# &ensp;2. 서비스 주요 기능 설명

### &emsp;**- 사용자**

- 사용자는 홈 화면에서 책의 카테고리와 책 목록을 확인할 수 있습니다.
- 책 상세정보를 확인하고 수량 선택해 장바구니에 담을 수 있습니다.
- 장바구니에서도 수량조절이 가능하고, 체크박스로 선택 삭제도 가능합니다.
- 결제하기 페이지에서 받는사람의 정보를 입력하고, 구매할 상품을 확인 후 결제 가능합니다.
- 사용자는 마이페이지에서 계정에 등록된 이름, 연락처, 주소, 비밀번호를 변경할 수 있습니다.
- 사용자는 주문 내역 페이지에서 각 주문 정보와 배송상태를 확인 가능하고, '배송 준비중'일 경우 배송정보를 수정할 수 있습니다.

### &emsp;**- 관리자**

- 관리자는 도서, 회원, 주문, 카테고리를 관리할 수 있습니다.
- 도서 관리 탭에서 책 정보를 수정하고, 새로운 책 상품을 등록할 수 있습니다.
- 회원 관리 탭에서 회원 정

<br>

# &ensp;3. 서비스 구성도

- 기술 스택: VanillaJS, Express.js, MongoDB, Docker, PM2
- 와이어프레임 링크: [Refresh Bookstore 와이어프레임](https://www.notion.so/4-18-50f780066803467a83aeac4a4e4ef4b8)
- API 명세 문서 링크: [Refresh Bookstore API 명세](https://www.notion.so/API-e0ced6930cd04a838b51927ad733c709)

<br>

# &ensp;4. 팀 구성

### &ensp;💪🏻 멤버별 Responsibility

| 멤버         | 책임                                              |
| ------------ | ------------------------------------------------- |
| 🐰 김영채(F) | 프로젝트 기획, 프로젝트 팀장, 장바구니, 주문 구현 |
| 🐶 황반석(F) | 관리자 페이지, 디자인 총괄                        |
| 🐥 신혜지(F) | 로그인, 회원가입, 홈, 마이페이지                  |
| 😺 김서연(B) | 데이터베이스 설계 및 상용 서비스 구현             |
| 🐻 송호준(B) | 배포 및 기본 기능 구현 관련                       |

<br>

# 5. 실행 방법

- 백엔드

  ```bash
  1. mongodb 실행
  2. npm install
  3. npm start
  ```

<br>

# 6. 버전

- 1.0.0

<br>

# 7. FAQ

#### **Q : 관리자 페이지는 어떻게 들어가나요?**

A : 관리자 계정으로 로그인 후 홈 화면 url path에 /user-admin 을 입력하여 접근 가능합니다!
<br>

##### 관리자 계정

```
아이디 : admin@naver.com
비밀번호 : !1q2w3e4r
```

#### **Q : 상품 추가도 가능한가요?**

A : 네! 관리자 페이지의 도서관리 탭에서 가능합니다. ISBN을 비롯한 책 정보들을 입력하면 책 사진은 자동으로 불러와집니다✨

<br>

# +. 파일구조

```
refresh-bookstore
└── src
    ├── app.js
    ├── bin
    ├── controllers
    │   ├── categoryController.js
    │   ├── loginController.js
    │   ├── orderController.js
    │   ├── productController.js
    │   └── userController.js
    ├── middlewares
    │   ├── authenticate.js
    │   ├── checkSession.js
    │   ├── hashPassword.js
    │   ├── isAdmin.js
    │   ├── session.js
    │   └── userValidation.js
    ├── models
    │   ├── Category.js
    │   ├── Order.js
    │   ├── Product.js
    │   ├── User.js
    │   └── types
    ├── routes
    │   ├── categoryRouters.js
    │   ├── homeRouter.js
    │   ├── orderRouters.js
    │   ├── pageRouters.js
    │   ├── productRouters.js
    │   └── userRouters.js
    ├── services
    │   ├── authService.js
    │   ├── categoryService.js
    │   ├── orderService.js
    │   ├── productService.js
    │   └── userService.js
    └── views
        ├── book-detail
        ├── book-search
        ├── cart
        ├── error-page
        ├── error.html
        ├── home
        ├── login
        ├── order-complete
        ├── order-create
        ├── order-detail
        ├── order-list
        ├── product-images
        ├── public
        ├── register
        ├── user-admin
        └── user-mypage
```
