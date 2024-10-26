import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { CiLogout } from "react-icons/ci";
function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser(user));
    window.location.reload();
  };

  return (
    <div className=" fixed w-36 bg-gray-900 text-white p-4 min-h-screen flex flex-col justify-between">
      <div>
        <h2 className=" font-bold mb-4">Admin Menu</h2>
        <ul>
          <li className="mb-2">
            <a href="#!" className="text-gray-200 hover:text-white">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
      <button
        className="flex  justify-around align-middle text-gray-200 hover:text-white text-center bg-red-600 hover:bg-red-500  rounded-2xl "
        onClick={handleLogout}
      >
        <CiLogout className="text-3xl " /> Logout
      </button>
    </div>
  );
}

export default Sidebar;
