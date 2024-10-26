import { useState, useEffect } from "react";
import axios from "axios";
import { PRODUCT_API_END_POINT } from "../constants/constants";
import Sidebar from "../components/Sidebar";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../redux/products/productSlice';

function AdminDashboard() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const products = useSelector((state) => state.products.products); // Get products from Redux state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${PRODUCT_API_END_POINT}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(setProducts(response.data.products)); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [dispatch, token]);

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${PRODUCT_API_END_POINT}/`, product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setProducts([...products, response.data])); // Update Redux state
    } catch (error) {
      console.error("Error adding product:", error.response.data.message);
    }
  };

  const updateProduct = async (product) => {
    try {
      const response = await axios.put(
        `${PRODUCT_API_END_POINT}/${editProductId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const updatedProduct = response.data.product;
      const updatedProducts = products.map((p) => (p._id === editProductId ? updatedProduct : p));
      dispatch(setProducts(updatedProducts)); // Update Redux state
      setIsEditing(false);
      setEditProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${PRODUCT_API_END_POINT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setProducts(products.filter((product) => product._id !== id))); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProductId(product._id);
    setFormData({ title: product.title, description: product.description, price: product.price, category: product.category });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto ml-36 p-6">
        <h1 className="text-3xl font-bold my-4">Admin Dashboard</h1>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
          onSubmit={isEditing ? updateProduct : addProduct}
        />
        <ProductList products={products} onEdit={handleEdit} onDelete={deleteProduct} />
      </div>
    </div>
  );
}

export default AdminDashboard;
