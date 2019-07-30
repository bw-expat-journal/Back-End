const db = require('./dbConfig');

const authModel = require('./authModel');

beforeEach(async () => {
  await db('users').truncate();
});

describe('users model', () => {
  describe('add()', () => {
    it('should add the provided users into the db', async () => {
      await authModel.add(
        {
          email: 'john@doe.com',
          first_name: 'John',
          last_name: 'Doe',
          password: '123456',
          is_admin: '1',
        },
      );
      await authModel.add(
        {
          email: 'jane@doe.com',
          first_name: 'Jane',
          last_name: 'Doe',
          password: '123456',
        },
      );
      const usersFromDB = await db('users');
      expect(usersFromDB).toHaveLength(2);
    });
  });
  describe('find()', () => {
    it('should get all users from the db', async () => {
      await authModel.add(
        {
          email: 'john@doe.com',
          first_name: 'John',
          last_name: 'Doe',
          password: '123456',
          is_admin: '1',
        },
      );
      const usersFromDb = await authModel.find();
      expect(usersFromDb).toHaveLength(1);
      expect(usersFromDb[0].id).toEqual(1);
    });
  });
  describe('findById()', () => {
    it('should get a user from the db using the provided id', async () => {
      await authModel.add(
        {
          email: 'john@doe.com',
          first_name: 'John',
          last_name: 'Doe',
          password: '123456',
          is_admin: '1',
        },
      );
      const userFromDb = await authModel.findById(1);
      expect(userFromDb.id).toEqual(1);
    });
  });
  describe('findBy()', () => {
    it('should get a user from the db using the provided property', async () => {
      await authModel.add(
        {
          email: 'john@doe.com',
          first_name: 'John',
          last_name: 'Doe',
          password: '123456',
          is_admin: '1',
        },
      );
      const userFromDb = await authModel.findBy({ email: 'john@doe.com' });
      expect(userFromDb.id).toEqual(1);
    });
  });
});
