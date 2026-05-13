// Stubbed for basic Vercel deployment — re-enable with DATABASE_URL
// import { PrismaClient } from "@prisma/client"
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//   })
//
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma = null as unknown as any
