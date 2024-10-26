import  { useState } from "react";
import {USER_API_END_POINT} from '../constants/constants';
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";




function RegisterPage() {

  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData);
      alert(response.data.message || "Registration successful!");
      navigate('/login')
    } catch (error) {
      console.error("Registration error:", error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-gray-500 text-white w-full py-2 rounded">
        Register
      </button>
      <hr className="border border-b-1  mt-4 mb-2" />
      <p>Already have Account ? <Link className="cursor text-blue-400 " to={'/login'}>Login</Link></p>
   
    </form>
  );
}

export default RegisterPage;
