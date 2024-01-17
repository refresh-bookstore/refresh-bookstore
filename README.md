<div align="center">
  <a href="https://refbook.kro.kr">
    <img src="src/views/public/images/logo_green.svg" alt="Refresh Bookstore Logo" width="400">
  </a>
  <br>
  <span style="font-size: 20px; color: green; background-color: yellow; padding: 10px; border-radius: 5px; text-decoration: none; border: 2px solid black; display: inline-block; margin-top: 20px;">
    "We are a bookstore to 'refresh' your mind." 🍃
  </span>
  <br>
  <a href="https://refbook.kro.kr" style="font-size: 16px; color: blue; text-decoration: none; margin-top: 10px;">
    Visit Refresh Bookstore 📚
  </a>
</div>

<div align="center">


## Tech Stack 🛠️

![Programming Languages and Frameworks](https://img.shields.io/badge/-Programming%20Languages%20and%20Frameworks-8A2BE2?style=for-the-badge&logo=appveyor&logoColor=white)<br>
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![ExpressJS](https://img.shields.io/badge/ExpressJS-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=ejs&logoColor=white)](https://ejs.co/)
[![VanillaJS](https://img.shields.io/badge/VanillaJS-F0DB4F?style=for-the-badge&logo=javascript&logoColor=white)](http://vanilla-js.com/)

<hr>

![Database and ORM](https://img.shields.io/badge/-Database%20and%20ORM-FF4500?style=for-the-badge&logo=redis&logoColor=white)<br>
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

<hr>

![Infrastructure and Deployment](https://img.shields.io/badge/-Infrastructure%20and%20Deployment-1E90FF?style=for-the-badge&logo=azure-devops&logoColor=white)<br>
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Oracle Cloud Infrastructure](https://img.shields.io/badge/Oracle_Cloud_Infrastructure-F80000?style=for-the-badge&logo=oracle&logoColor=white)](https://www.oracle.com/cloud/)
[![Caddy](https://img.shields.io/badge/Caddy-00ADD8?style=for-the-badge&logo=caddy&logoColor=white)](https://caddyserver.com/)

<hr>

![Other Tools](https://img.shields.io/badge/-Other%20Tools-32CD32?style=for-the-badge&logo=nuget&logoColor=white)<br>
[![TSOA](https://img.shields.io/badge/TSOA-10B981?style=for-the-badge&logo=typescript&logoColor=white)](https://tsoa-community.github.io/docs/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

<!-- 공백 추가 -->
<br><br>

<div align="left">

<!-- Installation and Setup -->
## &middot; Installation and Setup 🔧

This project can be built and run using Docker, without the need for installing Node.js or PostgreSQL separately. Follow these steps to get started:

1. **Install Docker**
   - Download Docker from the [Docker official website](https://www.docker.com/get-started).
   - Follow the installation guide for your operating system.
   - After installation, verify by running `docker --version` in your terminal.

2. **Build and Run with Docker Compose**
   - Ensure Docker is running on your system.
   - Clone the project repository to your local machine.
   - Navigate to the project directory in your terminal.
   - Run `docker-compose up` to build and start the services defined in your `docker-compose.yml` file.

<!-- System Architecture -->
## &middot; System Architecture 🌐
![295508987-c0f47b2b-68a0-4d25-a405-269596150458](https://github.com/refresh-bookstore/refresh-bookstore/assets/51044545/f24d8aad-ca25-4740-b190-e203339737aa)


## &middot; Features ✨
- 📚 **Home Screen**: Users can view book categories and lists.
- 📖 **Book Details**: View details, select quantities, and add to cart.
- 🛒 **Cart**: Adjust quantities, remove items via checkboxes.
- ❌ **Unavailable Products**: Cannot purchase if out of stock.
- 💳 **Checkout**: Enter recipient details, confirm items, and proceed to payment.
- 👤 **My Page**: Change registered name, contact, address, and password.
- 📦 **Order History**: View order details and shipping status; edit shipping info if 'Preparing for Delivery'.
- 🛠️ **General Management**: Admins can manage books, members, orders, and categories.
- 📝 **Book Management**: Modify book info, add new books.
- 👥 **Member Management**: View member information.


<!-- ERD -->
## &middot; ERD 📊
<details>
<summary><b>View ERD</b></summary>

![image](https://github.com/refresh-bookstore/refresh-bookstore/assets/51044545/a929dafc-7152-40b9-92da-a2f9577e8671)

</details>

<!-- File Structure -->
## &middot; File Structure 📁
<details>
<summary><b>View File Structure</b></summary>

```
├── README.md
├── docker
│   └── local.dockerfile
├── docker-compose.yml
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── app.ts
│   ├── configs
│   ├── controllers
│   ├── dtos
│   ├── exceptions
│   ├── middlewares
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── swagger
│   ├── utils
│   └── views
├── tsconfig.json
└── tsoa.json
```

</details>

<!-- Homepage Operation -->
## &middot; Homepage Operation 🖥️
<details>
<summary><b>View Screenshot</b></summary>

![animate-ezgif com-optimize](https://github.com/refresh-bookstore/.github/assets/51044545/1950b3f8-3196-46ed-a432-7c7a675d7515)

</details>


## &middot; Did you know? ❓

-  [Crafting Controllers with TSOA by Hojun Song](https://velog.io/@who_doctor/%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-1%EB%B6%80-TSOA%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-Express%EC%97%90%EC%84%9C%EB%8F%84-%EA%B9%94%EB%81%94%ED%95%98%EA%B2%8C-Controller-%EC%9E%91%EC%84%B1%ED%95%B4%EB%B3%B4%EA%B8%B0)







