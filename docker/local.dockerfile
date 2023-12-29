FROM node:20.10.0-bookworm-slim

# OpenSSL 설치
RUN apt-get update -y && apt-get install -y openssl

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

RUN npx prisma generate

# 애플리케이션 소스 복사
COPY . .

# TypeScript 컴파일
RUN npm run build

# 애플리케이션 실행
CMD npx prisma migrate deploy && node dist/app.js

