import { useContext } from "react";
import AuthContext from '../components/providers/AuthProvider'

// Custom hook for using the auth context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;  