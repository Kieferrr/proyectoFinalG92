import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Registro from "./views/Registro";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import NotFound from "./views/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;