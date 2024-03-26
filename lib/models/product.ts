const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
  link: { type: String, required: true, unique: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  currentPrice: { type: String, required: true },
  originalPrice: { type: String, required: true },
  priceHistory: [
    { 
      price: { type: String, required: true },
      date: { type: Date, default: Date.now }
    },
  ],
  lowestPrice: { type: String },
  highestPrice: { type: String },
  averagePrice: { type: String },
  email: { type: String}
}, { timestamps: true });

const Product = mongoose.models?.Product || mongoose.model('Product', productSchema);

export default Product;