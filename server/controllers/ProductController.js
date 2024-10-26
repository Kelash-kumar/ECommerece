const Product = require("../model/Product.model");
const errorHandler = require("../utils/errorHandler");
const asyncHandler = require("../utils/asyncHandler");


exports.GetAllProduct = asyncHandler(async(req,res,next) => {
    try {
        const products = await Product.find();
        if(!products) return next(new errorHandler(400,"No product exist"));

        res.status(200).json({
            message:"product fetched successfully",
            products
        })
    } catch (error) {
        return next(new errorHandler(500, error.message));
    }
});

exports.GetProduct = asyncHandler(async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) return next(new errorHandler(400,"No product exist"));

        res.status(200).json({
            message:"got successfully",
            product
        })
    } catch (error) {
        return next(new errorHandler(500, error.message));
    }
});


exports.AddProduct = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return next(new errorHandler(400, "all fields are required "));
    }
    const newProduct = await Product.create({title,description,price,category});
    res.status(200).json({
        message:"product added",
        Product:newProduct
    })
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.UpdateProduct = asyncHandler(async (req, res, next) => {
    try {
      const { title, description, price, category } = req.body;
      
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { title, description, price, category},
        { new: true, runValidators: true } 
      );
  
      if (!updatedProduct) {
        return next(new errorHandler(404, "Product not found"));
      }
  
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      return next(new errorHandler(500, error.message));
    }
  });

  exports.DeleteProduct = asyncHandler(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
  
      if (!product) {
        return next(new errorHandler(404, "Product not found"));
      }
  
      res.status(200).json({
        message: "Product deleted successfully",
        product,
      });
    } catch (error) {
      return next(new errorHandler(500, error.message));
    }
  });
  