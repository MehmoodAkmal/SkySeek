// useEncodedNavigate.js
import { EncodedRoutes } from "./routes";
import { useNavigate } from "react-router-dom";

export const useEncodedNavigate = () => {
  const navigate = useNavigate();

  const encodedNavigate = (friendlyPath, options = {}) => {
    const encodedPath = EncodedRoutes[friendlyPath] || friendlyPath;
    navigate(encodedPath, options);
  };

  return encodedNavigate;
};
