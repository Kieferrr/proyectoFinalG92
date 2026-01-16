import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyProvider from "./context/MyContext";
import Home from "./views/Home";
import Registro from "./views/Registro";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import NotFound from "./views/NotFound";

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;