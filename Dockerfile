FROM node:10-alpine
WORKDIR /app
COPY . .
#RUN npm config set registry http://$(ip route | grep default | awk '{print $3}'):8081/repository/npm-proxy
RUN npm install
RUN apk add netcat-openbsd
EXPOSE 3000
ENTRYPOINT [ "./entrypoint.sh" ]