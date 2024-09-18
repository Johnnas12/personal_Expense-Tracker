const request = require('supertest');
const app = require('../server'); 

// Testing user regsteration
describe('POST /api/users/register', () => {
  it('should respond with a 201 status code', (done) => {
    request(app)
    .post('/api/users/register')
    .set('Content-Type', 'application/json') 
    .send({ 
      name: "testuser",
      email: "orpa@gmail.com",
      password: "0909"
    })
    .expect(201, done);
  
  });
});

// Testing Login
describe('POST /api/users/login', () => {
    it('should respond with a 200 status code', (done) => {
      request(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json') 
      .send({ 
        email: "orpa@gmail.com",
        password: "0909"
      })
      .expect(200, done);
    
    });
  });



