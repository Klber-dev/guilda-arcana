import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import {
  getApiErrorMessage,
  isAuthError,
} from "../services/handleApiError";

function PerfilUsuario() {
  const navigate = useNavigate();

  const usuarioSalvo = localStorage.getItem("usuario");
  const usuarioInicial = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const [nome, setNome] = useState(usuarioInicial?.nome || "");
  const [login] = useState(usuarioInicial?.login || "");
  const [novaSenha, setNovaSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregandoAcao, setCarregandoAcao] = useState("");

  useEffect(() => {
    if (!usuarioInicial) {
      navigate("/login");
    }
  }, [usuarioInicial, navigate]);

  function mostrarMensagem(texto, tipo = "error") {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  async function atualizarPerfil(event) {
    event.preventDefault();

    setMensagem("");
    setTipoMensagem("");

    if (!nome.trim()) {
      mostrarMensagem("Informe seu nome.");
      return;
    }

    const dados = {
      nome: nome.trim(),
    };

    if (novaSenha) {
      dados.senha = novaSenha;
    }

    try {
      setCarregandoAcao("atualizarPerfil");

      const response = await api.post("?rota=usuarios&acao=atualizar", dados);

      const usuarioAtualizado = {
        ...usuarioInicial,
        nome: nome.trim(),
        login,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
      setNome(nome.trim());
      setNovaSenha("");

      mostrarMensagem(
        response.data.message || "Perfil atualizado com sucesso.",
        "success"
      );
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      if (isAuthError(error)) {
        localStorage.removeItem("usuario");
        navigate("/login");
        return;
      }

      mostrarMensagem(getApiErrorMessage(error, "Erro ao atualizar perfil."));
    } finally {
      setCarregandoAcao("");
    }
  }

  async function excluirConta() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita."
    );

    if (!confirmar) {
      return;
    }

    setMensagem("");
    setTipoMensagem("");

    try {
      setCarregandoAcao("excluirConta");

      await api.post("?rota=usuarios&acao=excluir");

      localStorage.removeItem("usuario");
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);

      if (isAuthError(error)) {
        localStorage.removeItem("usuario");
        navigate("/login");
        return;
      }

      mostrarMensagem(getApiErrorMessage(error, "Erro ao excluir conta."));
    } finally {
      setCarregandoAcao("");
    }
  }

  function sair() {
    localStorage.removeItem("usuario");
    navigate("/login");
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
              CONTA DO ARCANISTA
            </p>

            <h1 className="font-serif text-6xl text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.35)]">
              Perfil do Usuário
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-purple-100/75">
              Gerencie os dados da sua conta e mantenha suas informações de
              acesso atualizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-8 shadow-2xl shadow-purple-950/50">
              <div className="mb-8 flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 text-5xl text-purple-200 shadow-lg shadow-purple-600/30">
                  ✦
                </div>
              </div>

              <div className="text-center">
                <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-purple-300/70">
                  ARCANISTA
                </p>

                <h2 className="font-serif text-4xl text-[#f5e7c8]">
                  {nome || "Usuário"}
                </h2>

                <p className="mt-3 text-purple-100/60">@{login || "login"}</p>
              </div>

              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" />

              <div className="space-y-4">
                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5">
                  <p className="text-sm text-purple-200/60">Identificador</p>
                  <p className="mt-1 font-serif text-2xl text-[#f5e7c8]">
                    #{usuarioInicial?.id || "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5">
                  <p className="text-sm text-purple-200/60">Tipo de acesso</p>
                  <p className="mt-1 font-serif text-2xl text-[#f5e7c8]">
                    Administrador
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={sair}
                disabled={Boolean(carregandoAcao)}
                className="mt-8 w-full rounded-xl border border-purple-300/30 bg-purple-950/40 px-5 py-4 font-serif tracking-[0.18em] text-purple-100 transition hover:bg-purple-900/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                SAIR DA CONTA
              </button>
            </section>

            <section className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-6 shadow-2xl shadow-purple-950/50">
              <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-8 text-[#21172f]">
                <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-purple-700/70">
                  GERENCIAMENTO
                </p>

                <h2 className="font-serif text-4xl text-[#20122f]">
                  Editar Perfil
                </h2>

                <p className="mt-3 text-[#6b5d75]">
                  Atualize seu nome de exibição ou defina uma nova senha.
                </p>

                <div className="my-7 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

                <form onSubmit={atualizarPerfil} className="space-y-5">
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
                      disabled={Boolean(carregandoAcao)}
                      className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30 disabled:cursor-not-allowed disabled:opacity-70"
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
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-[#cbbfd4] bg-white/40 px-5 py-4 text-[#6b5d75] outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="novaSenha"
                      className="mb-2 block font-medium text-[#32243f]"
                    >
                      Nova senha
                    </label>

                    <input
                      id="novaSenha"
                      type="password"
                      value={novaSenha}
                      onChange={(event) => setNovaSenha(event.target.value)}
                      placeholder="Deixe vazio para manter a senha atual"
                      disabled={Boolean(carregandoAcao)}
                      className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30 disabled:cursor-not-allowed disabled:opacity-70"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={Boolean(carregandoAcao)}
                    className="w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.2em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
                  >
                    {carregandoAcao === "atualizarPerfil"
                      ? "SALVANDO..."
                      : "SALVAR PERFIL"}
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

                <div className="mt-8 border-t border-[#c8a978]/40 pt-6">
                  <p className="mb-4 text-sm text-[#6b5d75]">
                    Zona de perigo
                  </p>

                  <button
                    type="button"
                    onClick={excluirConta}
                    disabled={Boolean(carregandoAcao)}
                    className="w-full rounded-xl border border-red-400/50 bg-red-100 px-5 py-4 font-semibold text-red-800 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {carregandoAcao === "excluirConta"
                      ? "Excluindo..."
                      : "Excluir conta"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PerfilUsuario;