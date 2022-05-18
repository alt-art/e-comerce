import { PrismaClient } from '@prisma/client';
import axios from 'axios';

type Rating = {
  rate: number;
  count: number;
}

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

(async () => {
  const prisma = new PrismaClient();
  const { data } = await axios.get('https://fakestoreapi.com/products');
  const products = data as Product[];
  const newProductsPromises = products.map((product) => prisma.product.create({
    data: {
      name: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
    },
  }));
  await Promise.all(newProductsPromises);
})();
