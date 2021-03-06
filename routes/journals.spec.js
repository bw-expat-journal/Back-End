const request = require('supertest');
const server = require('../server');
const db = require('../models/dbConfig');

let token;

beforeAll(async () => {
  // const truncate = await db('users').truncate();
  const deleteMe = await db('users').where('id', '>', '0').del();
  if (deleteMe || deleteMe === 0) {
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

afterAll(async () => {
  await await db('users').where('id', '>', '0').del();
});

describe('[POST] /api/v1/journals/', () => {
  it('should create a jounal if all input are provided correctly', () => request(server)
    .post('/api/v1/journals/')
    .set('Authorization', token)
    .send({
      location: 'London',
      message: 'I stayed just a few months in London and I really cannot overemphasize how thrilled I am about the city',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.journal).toBeDefined();
    }));
  it('should return a 400 if required fields are not provided', () => request(server)
    .post('/api/v1/journals/')
    .set('Authorization', token)
    .send({
      post: '',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
});

describe('[PUT] /api/v1/journals/:id', () => {
  let journal;
  beforeAll(() => request(server)
    .get('/api/v1/journals/')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      ([journal] = res.body.journals);
    }));
  it('should update a jounal if all input are provided correctly', () => request(server)
    .put(`/api/v1/journals/${journal.id}`)
    .set('Authorization', token)
    .send({
      location: 'Columbia',
      message: 'I stayed just a few months in London and I really cannot overemphasize how thrilled I am about the city',
    })
    .expect(200)
    .expect('Content-Type', /json/)
    .then((response) => {
      expect(response.body.journal).toBeDefined();
    }));
  it('should return a 400 if required fields are not provided', () => request(server)
    .put(`/api/v1/journals/${journal.id}`)
    .set('Authorization', token)
    .send({
      post: '',
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
});

describe('[GET] /api/v1/journals/', () => {
  it('should get a list of journal entries', () => request(server)
    .get('/api/v1/journals/')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.journals).toBeDefined();
    }));
  it('should return a 401 if token is not valid', () => request(server)
    .get('/api/v1/journals/')
    .set('Authorization', 'token')
    .expect(401)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.name).toBe('JsonWebTokenError');
    }));
  it('should return a 401 if token is not provided', () => request(server)
    .get('/api/v1/journals/')
    .expect(401)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res.body.error).toBeDefined();
    }));
});

describe('[DELETE] /api/v1/journals/:id', () => {
  let journal;
  beforeAll(() => request(server)
    .get('/api/v1/journals/')
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      ([journal] = res.body.journals);
    }));
  it('should delete a jounal with the sopecified id', () => request(server)
    .delete(`/api/v1/journals/${journal.id}`)
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((response) => {
      expect(response.body.message).toBeDefined();
    }));
});
