// eslint-disable-next-line react/prop-types
function ProductForm({ formData, setFormData, isEditing, onSubmit }) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("price", formData.price);
    formDataWithImage.append("category", formData.category);
    if (formData.image) {
      formDataWithImage.append("image", formData.image);
    }
    onSubmit(formDataWithImage);
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Product" : "Add Product"}
      </h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product Price"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Product category"
        className="border p-2 mb-2 w-full"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        accept="image/*"
      />

      <button
        type="submit"
        className="bg-gray-500 text-white p-2 rounded w-full mt-2"
      >
        {isEditing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
