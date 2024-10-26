const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
     type: String, 
     required: true 
    },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  image: {
    data: Buffer,        // Buffer to store image data
    contentType: String  // To store MIME type
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
