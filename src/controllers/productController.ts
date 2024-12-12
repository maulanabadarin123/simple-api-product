import { Request, Response } from "express";
import * as ProductService from "../services/productService";
import { productSchema } from "../validators/productValidator";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await ProductService.getAllProducts();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Add a new product
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input data using zod
    const validatedData = productSchema.parse(req.body);

    // Ensure image is provided
    if (!req.file) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    // Create product with image URL
    const imageUrl = `/uploads/${req.file.filename}`;
    const product = await ProductService.createProduct(validatedData, imageUrl);

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error: error instanceof Error ? error.message : error });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await ProductService.getProductById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : error });
  }
};

// Delete product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedProduct = await ProductService.deleteProduct(id);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully", productId: id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error instanceof Error ? error.message : error });
  }
};
