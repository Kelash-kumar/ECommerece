import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
// eslint-disable-next-line react/prop-types
function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((product) => (
            <tr key={product._id}>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-gray-400 text-white p-1 rounded mx-1"
                >
                  <FaRegEdit/>
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="bg-gray-400 text-white p-1 rounded mx-1"
                >
                  <MdOutlineDelete className="hover:text-red-400"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
