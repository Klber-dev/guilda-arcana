import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import {
  getApiErrorMessage,
  isAuthError,
} from "../services/handleApiError";

function CadastroMago() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrarMago(event) {
    event.preventDefault();

    setMensagem("");
    setTipoMensagem("");

    if (!nome.trim() || !nivel) {
      setMensagem("Preencha todos os campos.");
      setTipoMensagem("error");
      return;
    }

    const nivelConvertido = Number(nivel);

    if (Number.isNaN(nivelConvertido) || nivelConvertido < 1) {
      setMensagem("Informe um nível válido para o mago.");
      setTipoMensagem("error");
      return;
    }

    try {
      setCarregando(true);

      const response = await api.post("?rota=magos&acao=criar", {
        nome: nome.trim(),
        nivel: nivelConvertido,
      });

      setMensagem(response.data.message || "Mago cadastrado com sucesso.");
      setTipoMensagem("success");

      setNome("");
      setNivel("");

      setTimeout(() => {
        navigate("/guilda");
      }, 1000);
    } catch (error) {
      console.error("Erro ao cadastrar mago:", error);

      if (isAuthError(error)) {
        navigate("/login");
        return;
      }

      setMensagem(getApiErrorMessage(error, "Erro ao cadastrar mago."));
      setTipoMensagem("error");
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07030f] text-white">
      <Header />

      <section className="relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.35),_transparent_35%)]" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full border border-purple-400/10" />
        <div className="absolute right-10 top-28 h-[520px] w-[520px] rounded-full border border-purple-300/10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-purple-700/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-purple-300/70">
              REGISTRO ARCANO
            </p>

            <h1 className="font-serif text-6xl text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.35)]">
              Cadastro de Mago
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-purple-100/75">
              Registre um novo mago para sua guilda. O espaço disponível da
              guilda será consumido ao cadastrar um novo membro.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-8 shadow-2xl shadow-purple-950/50">
              <div className="mb-8 flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 text-5xl text-purple-200 shadow-lg shadow-purple-600/30">
                  ✧
                </div>
              </div>

              <div className="text-center">
                <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-purple-300/70">
                  NOVO MEMBRO
                </p>

                <h2 className="font-serif text-4xl text-[#f5e7c8]">
                  Recrutamento
                </h2>

                <p className="mt-5 leading-relaxed text-purple-100/70">
                  Todo mago registrado passa a fazer parte da sua guilda. Depois
                  do cadastro, você poderá associar magias a ele através do
                  Spellbook.
                </p>
              </div>

              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" />

              <div className="space-y-4">
                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5">
                  <p className="font-serif text-xl text-[#f5e7c8]">
                    Nome do mago
                  </p>
                  <p className="mt-2 text-sm text-purple-100/60">
                    Identificação principal do personagem dentro da guilda.
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5">
                  <p className="font-serif text-xl text-[#f5e7c8]">Nível</p>
                  <p className="mt-2 text-sm text-purple-100/60">
                    Define quais magias o mago poderá aprender.
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5">
                  <p className="font-serif text-xl text-[#f5e7c8]">Guilda</p>
                  <p className="mt-2 text-sm text-purple-100/60">
                    O sistema vincula o mago automaticamente à sua guilda.
                  </p>
                </div>
              </div>
            </aside>

            <section className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-6 shadow-2xl shadow-purple-950/50">
              <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-8 text-[#21172f]">
                <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-purple-700/70">
                  FORMULÁRIO
                </p>

                <h2 className="font-serif text-4xl text-[#20122f]">
                  Registrar Mago
                </h2>

                <p className="mt-3 text-[#6b5d75]">
                  Informe os dados básicos do novo integrante da guilda.
                </p>

                <div className="my-7 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

                <form onSubmit={cadastrarMago} className="space-y-5">
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-2 block font-medium text-[#32243f]"
                    >
                      Nome do mago
                    </label>

                    <input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(event) => setNome(event.target.value)}
                      placeholder="Ex: Merlin"
                      disabled={carregando}
                      className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30 disabled:cursor-not-allowed disabled:opacity-70"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nivel"
                      className="mb-2 block font-medium text-[#32243f]"
                    >
                      Nível
                    </label>

                    <input
                      id="nivel"
                      type="number"
                      min="1"
                      value={nivel}
                      onChange={(event) => setNivel(event.target.value)}
                      placeholder="Ex: 5"
                      disabled={carregando}
                      className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30 disabled:cursor-not-allowed disabled:opacity-70"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={carregando}
                    className="w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.2em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
                  >
                    {carregando ? "CADASTRANDO..." : "CADASTRAR MAGO"}
                  </button>
                </form>

                <div className="mt-6 min-h-[56px]">
                  {mensagem && (
                    <div
                      className={`flex items-center justify-center rounded-xl border px-4 py-3 text-center text-sm font-medium shadow-sm ${
                        tipoMensagem === "success"
                          ? "border-green-400/60 bg-green-100 text-green-800"
                          : "border-red-400/60 bg-red-100 text-red-800"
                      }`}
                    >
                      <span className="mr-2">
                        {tipoMensagem === "success" ? "✓" : "⚠"}
                      </span>
                      {mensagem}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col gap-3 text-center text-sm sm:flex-row sm:justify-center">
                  <Link
                    to="/guilda"
                    className="font-semibold text-purple-700 hover:text-purple-900"
                  >
                    Voltar para guilda
                  </Link>

                  <span className="hidden text-[#6b5d75] sm:block">•</span>

                  <Link
                    to="/spellbook"
                    className="font-semibold text-purple-700 hover:text-purple-900"
                  >
                    Ir para Spellbook
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CadastroMago;