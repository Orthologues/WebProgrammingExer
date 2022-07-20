#! /usr/bin/bash
docker-compose up &&
docker exec -i todolist_mysql_1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql &
npm run dev
