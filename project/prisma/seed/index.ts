import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { encrypt } from '../../src/utils/encryption';

type Rating = {
  rate: number;
  count: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

(async () => {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@test.com',
      password: await encrypt('admin'),
      role: 'ADMIN',
    },
  });
  const { data } = await axios.get('https://fakestoreapi.com/products');
  const products = data as Product[];
  const newProductsPromises = products.map((product) => prisma.product.create({
    data: {
      name: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price,
    },
  }));
  await Promise.all(newProductsPromises);
})();
