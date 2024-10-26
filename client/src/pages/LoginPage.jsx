import { useState } from "react";
import { USER_API_END_POINT } from '../constants/constants';
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_API_END_POINT}/login`, formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      
      if (user.role === "admin") {
        navigate("/admin/"); 
      } else {
        navigate("/"); 
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-4"
        required
      >
        <option value="" disabled>Select your role</option>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-gray-500 text-white w-full py-2 rounded">
        Login
      </button>
      <hr className="border border-b-1  mt-4 mb-2" />
      <p>Don't have Account ? <Link className="cursor text-blue-400 " to={'/register'}>Register</Link></p>
    </form>
  );
}

export default LoginPage;
