import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { redisClient } from "../config/redis";


export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};


export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  const cacheKey = `product:${productId}`;

  // 1. Check Redis
  const cachedProduct = await redisClient.get(cacheKey);

  if (cachedProduct) {
    return res.json({message:"Product found in cache",product:JSON.parse(cachedProduct)});
  }



  // 2. Fetch from MongoDB
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // 3. Store in Redis (TTL = 60 sec)
  await redisClient.set(cacheKey, JSON.stringify(product), {
    EX: 20,
  });

  res.json({message:"Product found in database",product});
};
