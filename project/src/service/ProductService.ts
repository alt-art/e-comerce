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
