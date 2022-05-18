import request from 'supertest';
import express, { Application } from 'express';
import helmet from 'helmet';
import { mockReset } from 'jest-mock-extended';
import * as jose from 'jose';
import prismaMock from './prismaMock';
import router from '../router';
import config from '../config';

beforeEach(() => {
  mockReset(prismaMock);
});

const app: Application = express();

app.use(helmet());
app.use(express.json());
app.use(router);

describe('Product', () => {
  describe('GET /product', () => {
    it('should get all products', async () => {
      const products = [
        {
          id: '1',
          name: 'Product 1',
          price: 10,
          description: 'Product 1 description',
          image: 'product1.png',
          createdAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
        {
          id: '2',
          name: 'Product 2',
          price: 20,
          description: 'Product 2 description',
          image: 'product2.png',
          createdAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
      ];
      prismaMock.product.findMany.mockResolvedValue(products);
      const response = await request(app).get('/product');
      expect(response.body).toEqual(products);
      expect(response.status).toBe(200);
    });
  });
  describe('GET /product/:id', () => {
    it('should get a product', async () => {
      const product = {
        id: '1',
        name: 'Product 1',
        price: 10,
        description: 'Product 1 description',
        image: 'product1.png',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
      };
      prismaMock.product.findUnique.mockResolvedValue(product);
      const response = await request(app).get('/product/1');
      expect(response.body).toEqual(product);
      expect(response.status).toBe(200);
    });
    it('should return 404 if the product is not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);
      const response = await request(app).get('/product/1');
      expect(response.body).toEqual({
        error: 'Product not found',
      });
      expect(response.status).toBe(404);
    });
  });
  describe('POST /product', () => {
    it('should create a product', async () => {
      const product = {
        id: '1',
        name: 'Product 1',
        price: 10,
        description: 'Product 1 description',
        image: 'product1.png',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
      };
      prismaMock.product.create.mockResolvedValue(product);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'ADMIN',
        email: 'dummy_email',
      });
      const response = await request(app)
        .post('/product')
        .set('Authorization', token)
        .send({
          name: 'Product 1',
          price: 10,
          description: 'Product 1 description',
          image: 'product1.png',
        });
      expect(response.body).toEqual(product);
      expect(response.status).toBe(201);
    });
    it('should return 400 if the user is not an admin', async () => {
      prismaMock.product.create.mockResolvedValue(null);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      const response = await request(app)
        .post('/product')
        .set('Authorization', token)
        .send({
          name: 'Product 1',
          price: 10,
          description: 'Product 1 description',
          image: 'product1.png',
        });
      expect(response.body).toEqual({
        error: 'You are not authorized to perform this action',
      });
      expect(response.status).toBe(400);
    });
  });
  describe('PUT /product/:id', () => {
    it('should update a product', async () => {
      const product = {
        id: '1',
        name: 'Product 1',
        price: 10,
        description: 'Product 1 description',
        image: 'product1.png',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
      };
      prismaMock.product.update.mockResolvedValue(product);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'ADMIN',
        email: 'dummy_email',
      });
      const response = await request(app)
        .put('/product/1')
        .set('Authorization', token)
        .send({
          name: 'Product 1',
          price: 10,
          description: 'Product 1 description',
          image: 'product1.png',
        });
      expect(response.body).toEqual(product);
      expect(response.status).toBe(200);
    });
    it('should return 400 if the user is not an admin', async () => {
      prismaMock.product.update.mockResolvedValue(null);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      const response = await request(app)
        .put('/product/1')
        .set('Authorization', token)
        .send({
          name: 'Product 1',
          price: 10,
          description: 'Product 1 description',
          image: 'product1.png',
        });
      expect(response.body).toEqual({
        error: 'You are not authorized to perform this action',
      });
    });
  });
  describe('DELETE /product/:id', () => {
    it('should delete a product', async () => {
      prismaMock.product.delete.mockResolvedValue({
        id: '1',
        name: 'Product 1',
        price: 10,
        description: 'Product 1 description',
        image: 'product1.png',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
      });
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'ADMIN',
        email: 'dummy_email',
      });
      const response = await request(app)
        .delete('/product/1')
        .set('Authorization', token);
      expect(prismaMock.product.delete).toHaveBeenCalledWith({
        where: {
          id: '1',
        },
      });
      expect(response.status).toBe(200);
    });
    it('should return 400 if the user is not an admin', async () => {
      prismaMock.product.delete.mockResolvedValue(null);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      const response = await request(app)
        .delete('/product/1')
        .set('Authorization', token);
      expect(response.body).toEqual({
        error: 'You are not authorized to perform this action',
      });
      expect(response.status).toBe(400);
    });
  });
});
