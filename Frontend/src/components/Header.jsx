import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Header() {
  const navigate = useNavigate();

  const usuarioSalvo = localStorage.getItem("usuario");
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  async function logout() {
    try {
      await api.post("?rota=usuarios&acao=logout");
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("usuario");
    navigate("/login");
  }

  return (
    <header className="border-b border-purple-900/50 bg-[#10061f]/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to={usuario ? "/guilda" : "/"} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 text-2xl text-purple-200 shadow-lg shadow-purple-600/20">
            ✦
          </div>

          <div>
            <p className="font-serif text-lg tracking-[0.25em] text-purple-100">
              GUILDA
            </p>
            <p className="-mt-1 font-serif text-2xl text-[#f5e7c8]">
              ARCANA
            </p>
          </div>
        </Link>

        {usuario ? (
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/guilda"
              className="text-purple-100/80 transition hover:text-[#f5e7c8]"
            >
              Guilda
            </Link>

            <Link
              to="/spellbook"
              className="text-purple-100/80 transition hover:text-[#f5e7c8]"
            >
              Spellbook
            </Link>

            <Link
              to="/magos/cadastrar"
              className="text-purple-100/80 transition hover:text-[#f5e7c8]"
            >
              Cadastrar Mago
            </Link>

            <Link
              to="/perfil"
              className="rounded-xl border border-purple-300/30 px-5 py-2 text-purple-100 transition hover:bg-purple-900/40"
            >
              Perfil
            </Link>

            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-red-400/30 px-5 py-2 text-red-200 transition hover:bg-red-950/40"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/sobre"
              className="text-purple-100/80 transition hover:text-[#f5e7c8]"
            >
              Sobre
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-purple-300/30 px-5 py-2 text-purple-100 transition hover:bg-purple-900/40"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;