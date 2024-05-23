const app = require('../index');
const request = require('supertest');

const testData = {
  name: 'shyam',
  email: 'shyam@gmail.com',
  age: 23,
};

describe('User Routes', () => {
  let userId;
  test('POST /user/addUser - user added successfully', async () => {
    const res = await request(app).post('/user/addUser').send(testData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('createdUser');
    expect(res.body.createdUser).toHaveProperty('id');
    expect(res.body.createdUser).toHaveProperty('name', testData.name);
    expect(res.body.createdUser).toHaveProperty('email', testData.email);
    expect(res.body.createdUser).toHaveProperty('age', testData.age);
    expect(res.body).toHaveProperty('message', 'User created successfully');
    userId = res.body.createdUser.id;
  });

  test('POST /user/addUser - missing parameters', async () => {
    const res = await request(app).post('/user/addUser').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Required parameter missing');
  });

  test('POST /user/addUser - email already exists', async () => {
    const res = await request(app).post('/user/addUser').send(testData);
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message', 'email already exists');
  });

  test('GET /user/getUser - user fetched successfully', async () => {
    const res = await request(app).get('/user/getUser/' + userId);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('name', testData.name);
    expect(res.body).toHaveProperty('email', testData.email);
    expect(res.body).toHaveProperty('age', testData.age);
  });

  test('GET /user/getUser/:userId - user not found', async () => {
    const res = await request(app).get(
      '/user/getUser/c1000000-0000-4d91-a409-0370cb30b3f2'
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User data not found');
  });

  test('PUT /user/updateUser - user data updated successfully', async () => {
    const updatedUserData = {
      name: 'Donald truemp',
      age: 20,
      email: 'donald@gmail.com',
    };
    const res = await request(app)
      .put('/user/updateUser/' + userId)
      .send(updatedUserData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User data updated');
  });

  test('PUT /user/updateUser - required params missing', async () => {
    const res = await request(app)
      .put('/user/updateUser/' + userId)
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Required params missing');
  });

  test('PUT /user/updateUser - user not found', async () => {
    const res = await request(app)
      .put('/user/updateUser/c1000000-0000-4d91-a409-0370cb30b3f2')
      .send({ name: 'Ram' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  test('DELETE /user/deleteUser/:userId - user deleted successfully', async () => {
    const res = await request(app).delete('/user/deleteUser/' + userId);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'User deleted  successfully' });
  });

  test('DELETE /user/deleteUser/:userId - user not found', async () => {
    const res = await request(app).delete(
      '/user/deleteUser/c1000000-0000-4d91-a409-0370cb30b3f2'
    );
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });
});
