#!/bin/bash
. ../env.sh

# docker-machine start default
# docker-machine env
docker stop measurements1_postgres_test_1
docker rm measurements1_postgres_test_1
docker-compose up -d postgres_test
sleep 10
docker exec -i measurements1_postgres_test_1 psql -U measurements -d db_test < database/create_database.sql
docker exec -i measurements1_postgres_test_1 psql -U measurements -d db_test < database/test_data.sql
