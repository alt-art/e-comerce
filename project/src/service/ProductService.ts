import { User } from '@prisma/client';
import prisma from '../prisma';

export const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const createProduct = async (data: Product, user: User) => {
  if (user.role !== 'ADMIN') {
    throw new Error('You are not authorized to perform this action');
  }
  const product = await prisma.product.create({
    data,
  });
  return product;
};
