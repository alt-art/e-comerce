import { User } from '@prisma/client';
import prisma from '../prisma';
import cryptoAPI from '../utils/cryptoAPI';

export const getProducts = async () => {
  const products = await prisma.product.findMany();
  const { data: axiosData } = await cryptoAPI.get(
    '/quotes/latest?symbol=BTC,ETH',
  );
  const { data } = axiosData;
  return products.map((product) => ({
    ...product,
    crypto: {
      BTC: product.price / data.BTC.quote.USD.price,
      ETH: product.price / data.ETH.quote.USD.price,
    },
  }));
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
  const { data: axiosData } = await cryptoAPI.get(
    '/quotes/latest?symbol=BTC,ETH',
  );
  const { data } = axiosData;
  return {
    ...product,
    crypto: {
      BTC: product.price / data.BTC.quote.USD.price,
      ETH: product.price / data.ETH.quote.USD.price,
    },
  };
};

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export const createProduct = async (data: Product, user: User) => {
  if (user.role !== 'ADMIN') {
    throw new Error('You are not authorized to perform this action');
  }
  const product = await prisma.product.create({
    data,
  });
  return product;
};

export const updateProduct = async (id, data, user: User) => {
  if (user.role !== 'ADMIN') {
    throw new Error('You are not authorized to perform this action');
  }
  const productExists = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!productExists) {
    throw new Error('Product not found');
  }
  const product = await prisma.product.update({
    where: {
      id,
    },
    data,
  });
  return product;
};

export const deleteProduct = async (id, user: User) => {
  if (user.role !== 'ADMIN') {
    throw new Error('You are not authorized to perform this action');
  }
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return product;
};
