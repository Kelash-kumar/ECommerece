import ProductCard from "../components/ProductCard"
import SearchBar from "../components/SearchBar"
import {products} from '../data/productData';

const ProductListing = () => {
  return (
    <div className="m-20 ">
      all products Goes here 
      <SearchBar/>
      {
        products.map((product) =>(<ProductCard product={product} key={product._id}/>))
      }
    </div>
  )
}

export default ProductListing
