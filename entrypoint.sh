#! /bin/sh

until nc -z chaperoo-db 3306; do
    echo "waiting for db"
    sleep 1
done

node src/app.js