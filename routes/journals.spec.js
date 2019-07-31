const request = require('supertest');
const server = require('../server');
const db = require('../models/dbConfig');

let token;

beforeEach(async () => {
  const truncate = await db('users').truncate();
  if (truncate) {
    const response = await request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'yusuf@ayo.com',
        first_name: 'Yusuf',
        last_name: 'Ayo',
        password: '123456',
        confirm_password: '123456',
      });
    ({ token } = response.body);
  }
});

afterEach(async () => {
  await db('users').truncate();
});

describe('[POST] /api/v1/journals/', () => {
  it('should create a jounal if all input are provided correctly', () => request(server)
    .post('/api/v1/journals/')
    .send({
      location: 'London',
      post: 'I stayed just a few months in London and I really cannot overemphasize how thrilled I am about the city',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.data).toBeDefined();
    }));
  it('should return a 400 if required fields are not provided', () => request(server)
    .post('/api/v1/journals/')
    .send({
      post: '',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then((res) => {
      console.log(res);
      expect(res.body.error).toBeDefined();
    }));
});
