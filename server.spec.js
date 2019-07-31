const request = require('supertest');

const server = require('./server');

describe('root route', () => {
  describe('index route', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object fron the index route', async () => {
      const expectedBody = { message: 'Welcome to Expat Journal' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object fron the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });
  describe('unknown route', () => {
    it('should return a 404 Not Found on an unknown route', async () => {
      const expectedStatusCode = 404;

      const response = await request(server).get('/unknown');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object fron the unknown route', async () => {
      const expectedBody = { message: 'The resource you are looking for does not exist' };

      const response = await request(server).get('/unknown');

      expect(response.body).toEqual(expectedBody);
    });
  });
});
