FROM node:10-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN apk add netcat-openbsd
EXPOSE 3000
ENTRYPOINT [ "./entrypoint.sh" ]
