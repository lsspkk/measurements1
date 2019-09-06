FROM postgres:11-alpine

ADD ./create_database.sql /docker-entrypoint-initdb.d
ADD ./test_data.sql /docker-entrypoint-initdb.d