import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./components/Navbar";
import Count from "./context/Count";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Createuser from "./pages/users/Createuser";
import EditUsers from "./pages/users/Edituser";
import SignIn from "./pages/Login";
import Authlayout from "./components/layouts/Authlayout";
import Guestlayout from "./components/layouts/Guestlayout";
import { AuthProvider } from "./components/providers/AuthProvider";
import Notfound from "./pages/Notfound";
import CreateProperty from "./pages/property/CreateProperty";
import FetchProperty from "./pages/property/FetchProperty";
import EditProperties from "./pages/property/EditProperty";
import OuterComp from "./pages/frontend/OuterComp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Details from "./pages/frontend/OuterCard";
import ForgotPassword from "./pages/ForgotPassword";
import Resetpassword from "./pages/Resetpassword"

const defaultTheme = createTheme();

function App() {
  const [title, setTitle] = useState("");
  const [errorPath, setErrorPath] = useState("");

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <Count.Provider value={[title, setTitle]}>
            <Routes>
              <Route path="/" element={<OuterComp />} />
              <Route path="/details/:id" element={<Details />} />

              <Route element={<Guestlayout />}>
                <Route path="/login" element={<SignIn />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<Resetpassword />} />
              </Route>  
              <Route element={<Authlayout />}>
                <Route exact path="/admin" element={<Dashboard />} />
                <Route exact path="/admin/users" element={<Users />} />
                <Route
                  exact
                  path="/admin/createuser"
                  element={<Createuser />}
                />
                <Route
                  exact
                  path="/admin/users/edit/:id"
                  element={<EditUsers />}
                />
                <Route
                  exact
                  path="/admin/fetchproperty"
                  element={<FetchProperty />}
                />
                <Route
                  exact
                  path="/admin/createproperty"
                  element={<CreateProperty />}
                />
                <Route
                  exact
                  path="/admin/properties/edit/:id"
                  element={<EditProperties />}
                />
              </Route>
            </Routes>
          </Count.Provider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
