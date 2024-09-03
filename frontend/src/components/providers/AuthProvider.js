// import React, { createContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();


//   useEffect(() => {
//     const authToken = localStorage.getItem('authToken');
    
//     try {
//       if (authToken) {
//         fetch('http://localhost:7000/users/auth/me', {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.user) {
//             setUser(data.user);
//           }
//         });
//       }
//     } catch (error) {
      
//       console.log('token removed');
//       localStorage.removeItem('authToken');
//     }
//   },[])
  
//   const login = (userData) => {
//     setUser(userData.user);
//     localStorage.setItem('authToken', userData.token); // Simulate storing a token
//     //navigate('/');
//   }; 
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("authToken");
//     navigate('/login');
//   };
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// ---------------------------------------Set Interval-----------------------------

// import React, { createContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const checkAuthToken = async () => {
//     const authToken = localStorage.getItem('authToken');
//     if (authToken) {
//       try {
//         const response = await fetch('http://localhost:7000/users/auth/me', {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.user) {
//             setUser(data.user);
//           } else {
//             logout(); // Invalid token, logout the user
//           }
//         } else {
//           logout(); // Token validation failed, logout the user
//         }
//       } catch (error) {
//         console.error('Error during token validation', error);
//         logout();
//       }
//     }
//   };

//   useEffect(() => {
//     // Initial check
//     checkAuthToken();

//     // Set interval to check token every 1 seconds
//     const intervalId = setInterval(checkAuthToken, 100);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const login = (userData) => {
//     setUser(userData.user);
//     localStorage.setItem('authToken', userData.token); // Simulate storing a token
//     navigate('/');
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 // const [isLoading, setIsLoading] = useState(true); // Loading state to manage initial loading
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if token is valid
  const checkAuthToken = async () => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');;
    if (authToken) {
      try {
        const response = await fetch('http://localhost:7000/users/auth/me', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          } else {
            logout(); // Invalid token, logout the user
          }
        } else if (response.status === 401) {
          logout(); // Token validation failed, logout the user
        } else {
          throw new Error('Token validation failed');
        }
      } catch (error) {
        console.error('Error during token validation', error);
        logout();
      }
    } else {
      setUser(null); // No token, ensure user is null
    }
   // setIsLoading(false); // Stop loading regardless of token validity
  };

  useEffect(() => {
    checkAuthToken();
  }, [location.pathname]);

  // const login = (userData , rememberMe) => {
  //   setUser(userData.user);
  // //  console.log('Login called with:', { userData, rememberMe });
  //   // if (rememberMe) {
  //   //   localStorage.setItem('authToken', userData.token); // Store token in localStorage for persistent login.
  //   // } else {
  //   //   sessionStorage.setItem('authToken', userData.token); // Store token in sessionStorage for non-persistent login.
  //   // }
  //   localStorage.setItem('authToken', userData.token); // Store token
  //   navigate('/admin');
  // };
  const login = (token, user, rememberMe) => {
    setUser(user);
    if (rememberMe) {
      localStorage.setItem('authToken', token); // Store token in localStorage
      sessionStorage.removeItem('authToken'); // Clear sessionStorage
    } else {
      sessionStorage.setItem('authToken', token); // Store token in sessionStorage
      localStorage.removeItem('authToken'); // Clear localStorage
    }
    navigate('/admin');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken'); 
    navigate('/login');
  };

  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


