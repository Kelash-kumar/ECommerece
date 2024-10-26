import { motion } from "framer-motion";
import { MdAddShoppingCart } from "react-icons/md";
// eslint-disable-next-line react/prop-types
const ProductCard = ({product}) => {
  // console.log(product.product)
  return (
    <motion.div
    className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <img
      src={product.image || "placeholder-image.jpg"} // Use product image or placeholder
      alt={product.title}
      className="h-40 w-full object-cover rounded-md "
    />
    <span className="border border-gray-200 px-2 py-0 text-gray-400">{product.category}</span>
    <h2 className="text-xl font-semibold">{product.title}</h2>
    <p className="text-gray-600 my-2">{product.description}</p>
    <div className="flex justify-between items-center mt-4">
      <span className="text-lg font-bold">${product.price}</span>
      <button className="bg-gray-500  text-white py-1 px-4 rounded hover:bg-gray-600">
        <MdAddShoppingCart/>
      </button>
    </div>
  </motion.div>
  );
};

export default ProductCard;
