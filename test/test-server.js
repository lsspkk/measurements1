var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var should = chai.should()
chai.use(chaiHttp)

describe('Measure', function () {
  it('two measures GET /measure', (done) => {
    chai.request(server).get('/measure').end((err, res) => {
      res.should.have.status(200)
      res.body[0].name.should.equal('Mood')
      res.body[1].name.should.equal('Energy')
      done()
    })
  })
  it('test team group GET /group', (done) => {
    chai.request(server).get('/group').end((err, res) => {
      res.should.have.status(200)
      res.body[0].title.should.equal('Testteam1')
      done()
    })
  })
  it('two members in group 1 GET /group/1/member', (done) => {
    chai.request(server).get('/group/1/member').end((err, res) => {
      res.should.have.status(200)
      res.body[0].user.should.equal('Test1')
      res.body[1].user.should.equal('Test3')
      done()
    })
  })
  it('two measures in group 1 GET /group/1/measure', (done) => {
    chai.request(server).get('/group/1/measure').end((err, res) => {
      res.should.have.status(200)
      res.body[0].name.should.equal('Mood')
      res.body[1].name.should.equal('Energy')
      done()
    })
  })
  it('user Test1 is invited to Testteam2 GET /invitationrequest', (done) => {
    chai.request(server).get('/invitationrequest').end((err, res) => {
      res.should.have.status(200)
      res.body[0].group_name.should.equal('Testteam2')
      done()
    })
  })
  it('user Test1 is invited to Testteam2 GET /group/2/invitation', (done) => {
    chai.request(server).get('/group/2/invitation').end((err, res) => {
      res.should.have.status(200)
      res.body[0].invited_user.should.equal('Test1')
      done()
    })
  })
  it('user Test1 has invited Test2 to Testteam1 and they declined GET /invitationrequest', (done) => {
    chai.request(server).get('/invitationresponse').end((err, res) => {
      res.should.have.status(200)
      res.body[0].invited_user.should.equal('Test2')
      res.body[0].response.should.equal('declined')
      done()
    })
  })
  it('user Test2 has already been invited to Testteam1 POST /group/1/invitation', (done) => {
    chai.request(server).post('/group/1/invitation').send({ invited: 'tester2@test.fi' }).end((err, res) => {
      res.should.have.status(400)
      res.body.error.should.equals('User already invited to group')
      done()
    })
  })
  it('user Test3 is already in group Testteam1 POST /group/1/invitation', (done) => {
    chai.request(server).post('/group/1/invitation').send({ invited: 'tester3@test.fi' }).end((err, res) => {
      res.should.have.status(400)
      res.body.error.should.equals('User already in group')
      done()
    })
  })
  it('user Test4 is invited to POST /group/1/invitation', (done) => {
    chai.request(server).post('/group/1/invitation').send({ invited: 'tester4@test.fi' }).end((err, res) => {
      console.log(res.body)
      res.should.have.status(200)
      done()
    })
  })
})
