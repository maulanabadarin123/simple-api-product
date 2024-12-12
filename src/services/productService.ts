import { PrismaClient } from "@prisma/client"
import { ProductInput } from "../validators/productValidator"

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return await prisma.product.findMany()
}

export const createProduct = async (data: ProductInput, imageUrl:string) => {
  return await prisma.product.create({
    data: {...data, imageUrl}
  })
}

export const getProductById = async (id:number) => {
  return await prisma.product.findUnique({where:{id}})
}

export const deleteProduct = async (id:number) =>{
  return await prisma.product.delete({where:{id}})
}

