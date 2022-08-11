#! /usr/bin/bash
docker-compose up &&
docker exec -i todolist_mysql_1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql &
sleep 5 && yarn dev
# Run at production mode using a Node.js server
#yarn build && yarn start
# then run "docker container stop todolist_mysql_1" to stop the container
