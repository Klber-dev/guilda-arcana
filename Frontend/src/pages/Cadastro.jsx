import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthHeader from "../components/AuthHeader";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMensagem("");

    if (!nome || !login || !senha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post("?rota=usuarios&acao=cadastrar", {
        nome,
        login,
        senha,
      });

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      setMensagem(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  }

  return (
    <main className="min-h-screen bg-[#07030f] text-white">
      <AuthHeader />

      <div className="flex min-h-[calc(100vh-84px)] items-center justify-center p-6">
        <section className="w-full max-w-7xl min-h-[720px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-[2rem] border border-purple-900/50 shadow-2xl shadow-purple-950/70">
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
                  Registre-se. Erga sua guilda.
                </h2>

                <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-purple-100/80">
                  Crie sua conta, funde sua guilda e comece a organizar seus
                  magos, recursos e magias em um grimório digital.
                </p>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-5">
                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-center">
                  <p className="mb-3 text-3xl">◇</p>
                  <p className="font-serif text-lg text-[#f5e7c8]">Registro</p>
                  <p className="mt-2 text-xs text-purple-200/60">
                    entrada no sistema
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-center">
                  <p className="mb-3 text-3xl">✧</p>
                  <p className="font-serif text-lg text-[#f5e7c8]">Guilda</p>
                  <p className="mt-2 text-xs text-purple-200/60">
                    criação e gestão
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-center">
                  <p className="mb-3 text-3xl">✶</p>
                  <p className="font-serif text-lg text-[#f5e7c8]">Arcano</p>
                  <p className="mt-2 text-xs text-purple-200/60">
                    evolução mágica
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 text-purple-100/80">
              <p className="font-serif text-lg">
                “Toda grande guilda começa com um primeiro pacto.”
              </p>
              <p className="mt-2 text-sm text-purple-300/70">
                — Conselho Arcano
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
                  NOVO REGISTRO
                </p>

                <h2 className="font-serif text-5xl text-[#20122f]">
                  Cadastro Arcano
                </h2>

                <p className="mt-4 text-[#6b5d75]">
                  Preencha seus dados para criar sua conta na Guilda Arcana.
                </p>

                <div className="mx-auto mt-8 h-px w-80 bg-gradient-to-r from-transparent via-[#c8a978] to-transparent" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block font-medium text-[#32243f]"
                  >
                    Nome
                  </label>

                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Digite seu nome"
                    className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="login"
                    className="mb-2 block font-medium text-[#32243f]"
                  >
                    Login
                  </label>

                  <input
                    id="login"
                    type="text"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                    placeholder="Escolha um login"
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
                    placeholder="Crie uma senha"
                    className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmarSenha"
                    className="mb-2 block font-medium text-[#32243f]"
                  >
                    Confirmar senha
                  </label>

                  <input
                    id="confirmarSenha"
                    type="password"
                    value={confirmarSenha}
                    onChange={(event) =>
                      setConfirmarSenha(event.target.value)
                    }
                    placeholder="Confirme sua senha"
                    className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.25em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125"
                >
                  CRIAR CONTA
                </button>
              </form>

              <div className="mt-6 min-h-[56px]">
                {mensagem && (
                  <div
                    className={`flex items-center justify-center rounded-xl border px-4 py-3 text-center text-sm font-medium shadow-sm ${
                      mensagem.includes("sucesso")
                        ? "border-green-400/60 bg-green-100 text-green-800"
                        : "border-red-400/60 bg-red-100 text-red-800"
                    }`}
                  >
                    <span className="mr-2">
                      {mensagem.includes("sucesso") ? "✓" : "⚠"}
                    </span>
                    {mensagem}
                  </div>
                )}
              </div>

              <div className="mt-4 text-center text-sm text-[#6b5d75]">
                <p>
                  Já possui registro?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-purple-700 hover:text-purple-900"
                  >
                    Voltar para o login
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
      </div>
    </main>
  );
}

export default Cadastro;