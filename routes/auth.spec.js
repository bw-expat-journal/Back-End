const request = require('supertest');
const server = require('../server');

describe('[POST] /api/v1/auth/signup', () => {
  it('should create user if all input are provided correctly', () => request(server)
    .post('/api/v1/auth/signup')
    .send({
      email: 'yusuf@ayo.com',
      first_name: 'Yusuf',
      lastname: 'Ayo',
      password: '123456',
      confirm_password: '654321',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.token).toBeDefined();
    }));
  it('should return a 400 if required fields are not provided', () => request(server)
    .post('/api/v1/auth/signup')
    .send({
      email: 'yusuf@ayo.com',
      first_name: 'Yusuf',
      lastname: 'Ayo',
      password: '123456',
      confirm_password: '654321',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
  it('should return a 400 if passwords do not match', () => request(server)
    .post('/api/v1/auth/signup')
    .send({
      first_name: 'Yusuf',
      lastname: 'Ayo',
      password: '123456',
      confirm_password: '654321',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
  it('should return a 409 if user already exists', () => request(server)
    .post('/api/v1/auth/signup')
    .send({
      email: 'yusuf@ayo.com',
      first_name: 'Yusuf',
      lastname: 'Ayo',
      password: '123456',
      confirm_password: '654321',
    })
    .expect(409)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
});
