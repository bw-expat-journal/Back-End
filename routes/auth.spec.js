const request = require('supertest');
const server = require('../server');
const db = require('../models/dbConfig');

beforeEach(async () => {
  await db('users').where('id', '>', '0').del();
  await request(server)
    .post('/api/v1/auth/signup')
    .send({
      email: 'yusuf@ayo.com',
      first_name: 'Yusuf',
      last_name: 'Ayo',
      password: '123456',
      confirm_password: '123456',
    });
});

afterEach(async () => {
  await db('users').where('id', '>', '0').del();
});

describe('[POST] /api/v1/auth/signup', () => {
  it('should create user if all input are provided correctly', () => request(server)
    .post('/api/v1/auth/signup')
    .send({
      email: 'yusuf@ayo1.com',
      first_name: 'Yusuf',
      last_name: 'Ayo',
      password: '123456',
      confirm_password: '123456',
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
      password: '123456',
      confirm_password: '123456',
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
      last_name: 'Ayo',
      password: '123456',
      confirm_password: '123456',
    })
    .expect(409)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
});

describe('[POST] /api/v1/auth/login', () => {
  it('should login user if all input are provided correctly', () => request(server)
    .post('/api/v1/auth/login')
    .send({
      email: 'yusuf@ayo.com',
      password: '123456',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.token).toBeDefined();
    }));
  it('should not log user in if email and password is incorrect', () => request(server)
    .post('/api/v1/auth/login')
    .send({
      email: 'yusu',
      password: '123456',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
});
