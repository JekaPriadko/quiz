import request from 'supertest';

import app from '../../src/app';
import dbconnect from '../../src/db/mongoose/';
import { UserModel } from '../../src/models';

const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';
const userOne = {
  username: 'Test login',
  email: 'test_login@gmail.com',
  password: '1fAsfsdf45434',
};

beforeEach(async () => {
  await dbconnect;
  await UserModel.deleteMany();
  const newUser = new UserModel(userOne);
  await newUser.save();
});

describe('Test routes Sign Up', () => {
  test('Should signup a new user', async () => {
    const response = await request(app)
      .post(signUpUrl)
      .send({
        username: 'Dhriti',
        email: 'dhriti@gmail.com',
        password: '1fAsfsdf45434',
      })
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
    const user = await UserModel.findById(response.body.user._id);
    expect(user?.password).not.toBe('1fAsfsdf45434');

    const responseSame = await request(app)
      .post(signUpUrl)
      .send({
        username: 'Dhriti',
        email: 'dhriti@gmail.com',
        password: '1fAsfsdf45434',
      })
      .expect(400);

    expect(responseSame.body).toMatchObject({
      message: 'User exist',
    });
  });

  test('Should generate an error for an incorrect credentials', async () => {
    await request(app)
      .post(signUpUrl)
      .send({
        username: 'Dhriti',
        email: 'dhritigmail.com',
        password: '1fAsfsdf45434',
      })
      .expect(400);

    await request(app)
      .post(signUpUrl)
      .send({
        username: 'Dhriti',
        email: 'dhriti@gmail.com',
        password: '11111111',
      })
      .expect(400);
  });
});

describe('Test routes Sign In', () => {
  test('Should sign in with correct credentials', async () => {
    const response = await request(app)
      .post(signInUrl)
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);
  });

  test('Should not login nonexistent user', async () => {
    const response = await request(app)
      .post(signInUrl)
      .send({
        email: userOne.email,
        password: 'wrongPass',
      })
      .expect(400);
  });
});
