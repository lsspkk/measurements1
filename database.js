var knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'measurements',
    password: process.env.POSTGRES_PW,
    host: '127.0.0.1', // windows '192.168.99.100',
    database: 'db_test'
  }
})

module.exports = {
  getUserId(email) {
    return knex.from('measurementuser')
      .select('id')
      .where({ 'email': email })
      .then(rows => { return rows[0].id })
      .error(e => (-1))
  },

  getMeasurement(user_id, measure_id) {
    return knex.from('measurement')
      .select({ 'timestamp': 'stamp' }, { 'value': 'val' })
      .where({ measurementuser_id: user_id, measure_id: measure_id })
      .orderBy('timestamp')
  },
  postMeasurement(user_id, measure_id, value, stamp) {
    console.log(user_id, measure_id, value, stamp)
    return knex('measurement')
      .insert({ 'measurementuser_id': user_id, 'measure_id': measure_id, 'val': value, 'stamp': stamp })
  },
  getMeasure(user_id) {
    return knex.from('measure')
      .select('id', 'name', 'type', { 'min': 'low_limit' }, { 'max': 'high_limit' })
      .where({ measurementuser_id: user_id })
      .orWhere({ measurementuser_id: -1 })
  },
  getGroupByMember(user_id) {
    return knex.from('teammember').where({ 'measurementuser_id': user_id })
      .join('team', 'team_id', '=', 'team.id')
      .select('team.id', 'team.title', 'team.info', 'teammember.is_admin')
  },
  getGroupMembers(group_id) {
    return knex.from('teammember').where({ 'team_id': group_id })
      .join('measurementuser', 'measurementuser.id', '=', 'teammember.measurementuser_id')
      .select({ 'id': 'measurementuser.id' }, { 'username': 'measurementuser.username' }, { 'email': 'measurementuser.email' }, { 'is_admin': 'teammember.is_admin' })
  },
  postGroup(title, info) {
    return knex('team').insert({ 'title': title, 'info': info })
  },
  postGroupMember(group_id, user_id, is_admin) {
    return knex('teammembe((r').insert({ 'team_id': group_id, 'measurementuser_id': user_id, 'is_admin': is_admin })
  },
  postGroupInvitation(group_id, inviter_id, invited_id) {
    return knex('teaminvitation')
      .insert({ 'response': '', 'team_id': group_id, 'inviter_id': inviter_id, 'invited_id': invited_id })
  },
  getGroupInvitation(user_id) {
    return knex('teaminvitation').where({ inviter_id: user_id })
      .join('team', { 'team.id': 'teaminvitation.team_id' })
      .join('measurementuser', { 'measurementuser.id': 'teaminvitation.invited_id' })
      .select({ id: 'teaminvitation.id' }, { 'response': 'teaminvitation.response' }, { 'group_name': 'team.title' }, { 'group_info': 'team.info' }, { 'invited_name': 'measurementuser.username' }, { 'invited_email': 'measurementuser.email' })
    // add the measures of group
  },
  getGroupInvited(invited_id) {
    return knex('teaminvitation').where({ invited_id: invited_id, response: '' })
      .join('team', { 'team.id': 'teaminvitation.team_id' })
      .join('measurementuser', { 'measurementuser.id': 'teaminvitation.inviter_id' })
      .select({ id: 'teaminvitation.id' }, { 'group_name': 'team.title' }, { 'group_info': 'team.info' }, { 'inviter_name': 'measurementuser.username' }, { 'inviter_email': 'measurementuser.email' })
    // add the measures of group
  },

  getGroupMeasurement(group_id, measure_id) {
    return knex.from('teammember').where({ 'team_id': group_id })
      .join('measurement', 'measurement.measurementuser_id', '=', 'teammember.measurementuser_id')
      .where({ 'measurement.measure_id': measure_id })
      .join('measurementuser', 'measurementuser.id', '=', 'measurement.measurementuser_id')
      .select({ 'user': 'measurementuser.username' }, { 'timestamp': 'measurement.stamp' }, { 'measurement.value': 'val' })
      .orderBy('timestamp')
  }

}

// module.exports.getGroupMeasurement(1, 1).then(rows => { console.log(rows) })

// knex.from('measurement').select().then(rows => {
//   console.log(rows)
// })

module.exports.getGroupMembers(1).then(rows => { console.log(rows) })

module.exports.getGroupInvitation(1).then(rows => { console.log(rows) })
module.exports.getGroupInvited(1).then(rows => { console.log(rows) })
