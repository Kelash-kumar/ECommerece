import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser(user));
    window.location.reload();
  };

  return (
    <div className="w-full h-20 flex justify-between items-center shadow-sm px-6 ">
      <h1 className="text-3xl text-Yellow-800 font-bold">
        E<span className="text-gray-400">Commerce</span>
      </h1>

      <div className="flex items-center space-x-6">
        {user?.role === "admin" && (
          <Link
            to={"/admin/"}
            className="text-gray-300 text-lg hover:text-gray-500 transition duration-200"
          >
            Dashboard
          </Link>
        )}
        <button
          className="text-lg px-3 py-1 border border-gray-500 rounded-full bg-gray-700 text-white hover:bg-gray-600 shadow-md transition duration-200"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
