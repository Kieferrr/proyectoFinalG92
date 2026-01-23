import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyProvider, { MyContext } from "./context/MyContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./views/Home";
import Registro from "./views/Registro";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Detalle from "./views/Detalle";
import Publicar from "./views/Publicar";
import NotFound from "./views/NotFound";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(MyContext);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/producto/:id" element={<Detalle />} />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publicar"
            element={
              <ProtectedRoute>
                <Publicar />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          theme="dark"
        />
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;