import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
