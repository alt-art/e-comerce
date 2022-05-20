import { User } from '@prisma/client';
import prisma from '../prisma';

type Product = {
  id: string;
  quantity: number;
};

export const createOrder = async (products: Product[], user: User) => {
  const productsExistsPromise = products.map((product) => prisma.product.findUnique({
    where: {
      id: product.id,
    },
  }));
  const productsExists = await Promise.all(productsExistsPromise);
  if (productsExists.some((product) => !product)) {
    throw new Error('Product not found');
  }
  const orderPromise = products.map((product) => prisma.orderProduct.create({
    data: {
      productId: product.id,
      quantity: product.quantity,
      userId: user.id,
    },
  }));
  const order = await Promise.all(orderPromise);
  return order;
};

export const deleteOrderProduct = async (id: string, user: User) => {
  const orderProduct = await prisma.orderProduct.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!orderProduct) {
    throw new Error('Order product not found');
  }
  await prisma.orderProduct.delete({
    where: {
      id: orderProduct.id,
    },
  });
};
