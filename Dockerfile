FROM node:16 as builder 
WORKDIR /usr/src/app
COPY package.json ./
RUN apt install git
RUN npm install
COPY . .
FROM keymetrics/pm2:16-alpine
WORKDIR /usr/src/app/apartment
COPY --from=builder /usr/src/app /usr/src/app/apartment
CMD pm2-runtime start npm --name apartmentmanagementsystem -- run start
