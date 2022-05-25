import { useNavigate, Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  return children;
};

export default Protected;
