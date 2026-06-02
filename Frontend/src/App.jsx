import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import PerfilUsuario from "./pages/PerfilUsuario";
import PerfilGuilda from "./pages/PerfilGuilda";
import CadastroMago from "./pages/CadastroMago";
import Spellbook from "./pages/Spellbook";
import MagiaDetalhe from "./pages/MagiaDetalhe";
import Sobre from "./pages/Sobre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/perfil" element={<PerfilUsuario />} />

      <Route path="/guilda" element={<PerfilGuilda />} />

      <Route path="/magos/cadastrar" element={<CadastroMago />} />

      <Route path="/spellbook" element={<Spellbook />} />

      <Route path="/spellbook/:index" element={<MagiaDetalhe />} />

      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;