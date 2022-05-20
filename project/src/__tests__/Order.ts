import 'dotenv/config';
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
  describe('POST /order', () => {
    it('should create order', async () => {
      const products = [
        {
          id: '1',
          quantity: 10,
        },
        {
          id: '2',
          quantity: 20,
        },
      ];
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      prismaMock.product.findUnique.mockResolvedValue({
        name: 'User 1',
        description: 'Product 2 description',
        image: 'user.png',
        category: '',
        price: 10,
      });
      prismaMock.orderProduct.create.mockResolvedValue({
        id: 'dummy_id',
        productId: '1',
        quantity: 10,
        userId: 'dummy_id',
      });
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      const response = await request(app)
        .post('/order')
        .set('Authorization', token)
        .send(products);
      expect(response.body).toEqual([
        {
          id: 'dummy_id', productId: '1', quantity: 10, userId: 'dummy_id',
        },
        {
          id: 'dummy_id', productId: '1', quantity: 10, userId: 'dummy_id',
        },
      ]);
    });
    it('should return 400 if the product id is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      prismaMock.product.findUnique.mockResolvedValue(null);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      const response = await request(app)
        .post('/order')
        .set('Authorization', token)
        .send([
          {
            id: '1',
            quantity: 10,
          },
        ]);
      expect(response.body).toEqual({
        error: 'Product not found',
      });
      expect(response.status).toBe(404);
    });
  });
  describe('DELETE /order/:id', () => {
    it('should delete order', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      prismaMock.orderProduct.findFirst.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      prismaMock.orderProduct.delete.mockResolvedValue(null);
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      const response = await request(app)
        .delete('/order/1')
        .set('Authorization', token);
      expect(response.status).toBe(200);
    });
    it('should return 400 if the order is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'dummy_id',
        name: 'dummy_name',
        role: 'USER',
        email: 'dummy_email',
      });
      const token = await new jose.SignJWT({ userId: 'dummy_id' })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(config.appSecret);
      const response = await request(app)
        .delete('/order/1')
        .set('Authorization', token);
      expect(response.body).toEqual({
        error: 'Order product not found',
      });
      expect(response.status).toBe(404);
    });
  });
});
