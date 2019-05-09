# measurements1

Get your Google API keys, and set them up in a file e.g. env.sh outside version control folder, with this contents

          #!/usr/bin/env sh
          export GOOGLE_CLIENT_ID=[your own client id]
          export GOOGLE_CLIENT_SECRET=[your own client secret]
          
In Bash run the script like this to get environment variables set up for your shell
          
          . ./env.sh


# express additions
passport

express-validator
https://github.com/chriso/validator.js#sanitizers
https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7

# Database: dockerized postgresql

npm install --save pg
npm install --save knex


Here's some interesting links
https://codefresh.io/docs/docs/yaml-examples/examples/populate-a-database-with-existing-data/
https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc

Most popular nodejs orm 2018 seems to be http://docs.sequelizejs.com/
But we use https://knexjs.org/ which is like "plain SQL with javascript syntax".



## Docker
docker-machine ip

## backups
? how to get backups and move database contents to another server

## create postgresql database
docker exec -i measurements1_postgres_test_1 psql -U measurements -d db_test < database/test_data.sql

