FROM node:20.10.0-bookworm-slim

# OpenSSL 설치
RUN apt-get update -y && apt-get install -y openssl

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

# package.json, package-lock.json 및 schema.prisma 복사
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/

# 의존성 설치
RUN npm install

# 애플리케이션 실행
CMD ["npm", "run", "dev"]
