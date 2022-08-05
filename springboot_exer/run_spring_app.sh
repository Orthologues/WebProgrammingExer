#! /usr/bin/bash
proj_name="demo" && proj_ver="0.0.1" && test_route="hei-suomi" &&
cd $proj_name &&
mvn clean package &&
java -jar target/${proj_name}-${proj_ver}-SNAPSHOT.jar &&
sleep 2 && curl -sSL localhost:8080 && curl -sSL localhost:8080/$test_route
