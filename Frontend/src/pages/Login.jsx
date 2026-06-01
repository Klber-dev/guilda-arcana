import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const response = await api.post("?rota=usuarios&acao=login", {
        login,
        senha,
      });

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      if (response.data.data) {
        localStorage.setItem("usuario", JSON.stringify(response.data.data));
      }

      navigate("/guilda");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  }

  return (
    <main className="min-h-screen bg-[#07030f] text-white flex items-center justify-center p-6">
      <section className="w-full max-w-7xl min-h-[720px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-[2rem] border border-purple-900/50 shadow-2xl shadow-purple-950/70">
        {/* Painel esquerdo */}
        <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#10061f] px-14 py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.45),_transparent_35%)]" />
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-purple-400/10" />
          <div className="absolute left-20 top-16 h-[520px] w-[520px] rounded-full border border-purple-300/10" />
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-purple-700/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-10 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 shadow-lg shadow-purple-600/30">
                <span className="text-5xl text-purple-200">✦</span>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-2 font-serif text-3xl tracking-[0.35em] text-purple-100">
                GUILDA
              </p>

              <h1 className="font-serif text-7xl tracking-wide text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.35)]">
                ARCANA
              </h1>

              <div className="mx-auto my-7 h-px w-80 bg-gradient-to-r from-transparent via-purple-300/70 to-transparent" />

              <h2 className="font-serif text-2xl text-[#f5e7c8]">
                Governança. Conhecimento. Magia.
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-purple-100/80">
                Gerencie sua guilda, acompanhe seus magos, organize registros
                mágicos e consulte seu grimório em um só lugar.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-5">
              <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-center">
                <p className="mb-3 text-3xl">◇</p>
                <p className="font-serif text-lg text-[#f5e7c8]">Guilda</p>
                <p className="mt-2 text-xs text-purple-200/60">
                  controle e evolução
                </p>
              </div>

              <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-center">
                <p className="mb-3 text-3xl">✧</p>
                <p className="font-serif text-lg text-[#f5e7c8]">Magos</p>
                <p className="mt-2 text-xs text-purple-200/60">
                  cadastro e gestão
                </p>
              </div>

              <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-center">
                <p className="mb-3 text-3xl">✶</p>
                <p className="font-serif text-lg text-[#f5e7c8]">Spellbook</p>
                <p className="mt-2 text-xs text-purple-200/60">
                  magias e saberes
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-purple-100/80">
            <p className="font-serif text-lg">
              “O conhecimento é a mais estável das magias.”
            </p>
            <p className="mt-2 text-sm text-purple-300/70">
              — Arquimago Valerius
            </p>
          </div>
        </aside>

        <section className="relative flex items-center justify-center bg-[#efe6da] px-8 py-12 text-[#21172f]">
          <div className="absolute inset-6 rounded-[1.5rem] border border-[#c8a978]/50 pointer-events-none" />

          <div className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-[#c8a978]/50 bg-[#efe6da] text-3xl text-purple-700 shadow-md">
            ✦
          </div>

          <div className="w-full max-w-xl pt-16">
            <div className="mb-8 text-center">
              <p className="mb-4 text-sm font-semibold tracking-[0.35em] text-purple-700/70">
                BEM-VINDO DE VOLTA
              </p>

              <h2 className="font-serif text-5xl text-[#20122f]">
                Entrada da Guilda
              </h2>

              <p className="mt-4 text-[#6b5d75]">
                Identifique-se para acessar o sistema da Guilda Arcana.
              </p>

              <div className="mx-auto mt-8 h-px w-80 bg-gradient-to-r from-transparent via-[#c8a978] to-transparent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="login"
                  className="mb-2 block font-medium text-[#32243f]"
                >
                  Nome de usuário
                </label>

                <input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  placeholder="Digite seu login"
                  className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                />
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="mb-2 block font-medium text-[#32243f]"
                >
                  Senha
                </label>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.25em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125"
              >
                ENTRAR NA GUILDA
              </button>
            </form>

            <div className="mt-6 min-h-[56px]">
              {mensagem && (
                <div className="flex items-center justify-center rounded-xl border border-red-400/60 bg-red-100 px-4 py-3 text-center text-sm font-medium text-red-800 shadow-sm">
                  {mensagem}
                </div>
              )}
            </div>

            <div className="mt-4 text-center text-sm text-[#6b5d75]">
              <p>
                Ainda não possui registro?{" "}
                <Link
                  to="/cadastro"
                  className="font-semibold text-purple-700 hover:text-purple-900"
                >
                  Cadastre-se agora
                </Link>
              </p>

              <p className="mt-4">
                <Link
                  to="/sobre"
                  className="text-purple-700/80 hover:text-purple-900"
                >
                  Sobre o projeto
                </Link>
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Login;