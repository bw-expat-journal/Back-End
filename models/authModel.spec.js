const db = require('./dbConfig');

const authModel = require('./authModel');

beforeEach(async () => {
  await db('users').truncate();
});

afterEach(async () => {
  await db('users').truncate();
});

describe('add()', () => {
  it('should add the provided users into the db', async () => {
    const userFromDB = await authModel.add(
      {
        email: 'john@doe.com',
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
        is_admin: '1',
      },
    );
    expect(userFromDB).toHaveLength(1);
  });
});
describe('findById()', () => {
  it('should get a user from the db using the provided id', async () => {
    const user = await authModel.add(
      {
        email: 'john@doe.com',
        first_name: 'John',
        last_name: 'Doe',
        password: '123456',
        is_admin: '1',
      },
    );
    if (user) {
      const userFromDb = await authModel.findById(1);
      expect(userFromDb.id).toEqual(1);
    }
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
