import { PrismaClient } from '@prisma/client';

import { mockDeep } from 'jest-mock-extended';

import prisma from '../prisma';

jest.mock('../prisma', () => ({
  __esModule: true,

  default: mockDeep<PrismaClient>(),
}));

export default prisma as any;
