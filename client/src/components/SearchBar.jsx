
// eslint-disable-next-line react/prop-types
const SearchBar = ({searchProductByName,setSearchProductByName}) => {
  return (
    <input
    type="text"
    placeholder="Search products..."
    value={searchProductByName}
    onChange={(e) => setSearchProductByName(e.target.value)}
    className="border p-2 mb-4 w-full"
  />
  )
}

export default SearchBar
