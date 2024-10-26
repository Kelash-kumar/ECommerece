import { useEffect, useState } from "react";
import { PRODUCT_API_END_POINT } from "../constants/constants";
import axios from "axios";
import Navbar from "../components/navbar";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/products/productSlice";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const products = useSelector((state) => state.products.products);
  const [searchProductByName, setSearchProductByName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${PRODUCT_API_END_POINT}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setProducts(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch, token]);

  // search product by their name:
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchProductByName.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-center my-6">Our Products</h1>
      <SearchBar
        setSearchProductByName={setSearchProductByName}
        searchProductByName={searchProductByName}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
