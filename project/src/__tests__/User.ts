import request from 'supertest';
import express, { Application } from 'express';
import helmet from 'helmet';
import * as jose from 'jose';
import { mockReset } from 'jest-mock-extended';
import prismaMock from './prismaMock';
import { encrypt } from '../utils/encryption';
import router from '../router';
import config from '../config';

beforeEach(() => {
  mockReset(prismaMock);
});

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(router);

describe('User', () => {
  describe('POST /users', () => {
    it('should create a user', async () => {
      const user = {
        id: 'dummy-id',
        name: 'john',
        email: 'johndoe@test.com',
      };
      jose.SignJWT.prototype.sign = jest.fn().mockResolvedValue('dummy-token');
      prismaMock.user.create.mockResolvedValue(user);
      const response = await request(app).post('/user').send({
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: 'best password ever',
      });
      expect(jose.SignJWT.prototype.sign).toHaveBeenCalledWith({
        userId: user.id,
      }, config.appSecret);
      expect(response.body).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
        token: 'dummy-token',
      });
      expect(response.status).toBe(201);
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app).post('/user').send({
        name: 'John Doe',
        email: 'johndoe@test.com',
      });
      expect(response.body).toEqual({
        error: 'password is a required field',
      });
      expect(response.status).toBe(400);
    });

    it('should return 400 if the password is too weak', async () => {
      const response = await request(app).post('/user').send({
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: 'password',
      });
      expect(response.body).toEqual({
        error: 'This is a top-10 common password',
      });
      expect(response.status).toBe(400);
    });
  });

  describe('POST /user/login', () => {
    it('should return a object with the user and a token with the email and password on requisition', async () => {
      const user = {
        id: 'dummy-id',
        username: 'john',
        email: 'johndoe@test.com',
        secret: 'dummy-secret',
        password: await encrypt('best password ever'),
      };
      jose.SignJWT.prototype.sign = jest.fn().mockResolvedValue('dummy-token');
      prismaMock.user.findUnique.mockResolvedValue(user);
      const response = await request(app).post('/user/login').send({
        email: user.email,
        password: 'best password ever',
      });
      expect(response.body).toEqual({
        id: user.id,
        username: user.username,
        email: user.email,
        token: 'dummy-token',
      });
    });
    it('should return 400 if the email or password is incorrect', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const response = await request(app).post('/user/login').send({
        email: 'john',
        password: 'best password ever',
      });
      expect(response.body).toEqual({
        error: 'email is incorrect',
      });
      expect(response.status).toBe(400);
    });
    it('should return 400 if the email is missing', async () => {
      const response = await request(app).post('/user/login').send({
        password: 'best password ever',
      });
      expect(response.body).toEqual({
        error: 'email is required',
      });
      expect(response.status).toBe(400);
    });
    it('should return 400 if the password is missing', async () => {
      const response = await request(app).post('/user/login').send({
        email: 'johndoe@test.com',
      });
      expect(response.body).toEqual({
        error: 'password is a required field',
      });
      expect(response.status).toBe(400);
    });
    it('should return 400 if the password does not match', async () => {
      const user = {
        id: 'dummy-id',
        username: 'john',
        email: 'johndoe@test.com',
        secret: 'dummy-secret',
        password: await encrypt('best password ever'),
      };
      prismaMock.user.findUnique.mockResolvedValue(user);
      const response = await request(app).post('/user/login').send({
        email: user.email,
        password: 'wrong password',
      });
      expect(response.body).toEqual({
        error: 'password is incorrect',
      });
      expect(response.status).toBe(400);
    });
  });
});
