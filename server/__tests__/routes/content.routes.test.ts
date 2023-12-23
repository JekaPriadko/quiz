import request from 'supertest';

import app from '../../src/app';

const contentUrl = '/api/v1/content';

describe('Test routes with content', () => {
  test('Get open content', async () => {
    const res = await request(app).get(`${contentUrl}/all`);
    expect(res.body).toEqual({
      payload: 'Public Content.',
    });
  });

  test('Get user content without token', async () => {
    const res = await request(app).get(`${contentUrl}/user`);
    expect(res.statusCode).toBe(401);
  });

  test('Get admin content without token', async () => {
    const res = await request(app).get(`${contentUrl}/admin`);
    expect(res.statusCode).toBe(401);
  });
});
