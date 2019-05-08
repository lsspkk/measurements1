var knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'measurements',
    password: process.env.POSTGRES_PW,
    host: '192.168.99.100',
    database: 'db_test'
  }
})

// knex.from('measurement').select().then(rows => {
//   console.log(rows)
// })

module.exports = {
  getMeasurement(user_id, measure_id) {
    return knex.from('measurement')
      .select({'timestamp':'stamp'}, {'value': 'val'})
      .where({ measurementuser_id: user_id, measure_id: measure_id })
      .orderBy('timestamp')
  },
  putMeasurement(user_id, measure_id, value, stamp) {
    console.log(user_id, measure_id, value, stamp)
    return knex('measurement')
    .insert({ 'measurementuser_id': user_id, 'measure_id': measure_id, 'val': value, 'stamp': stamp})
  },
  getMeasure(user_id) {
    return knex.from('measure')
    .select('id', 'name', 'type', {'min':'low_limit'}, {'max': 'high_limit'})
    .where({ measurementuser_id: user_id })
  },
}