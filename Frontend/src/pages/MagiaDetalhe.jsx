import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import dndApi from "../services/dndApi";
import api from "../services/api";
import {
  getApiErrorMessage,
  isAuthError,
} from "../services/handleApiError";

function MagiaDetalhe() {
  const { index } = useParams();
  const navigate = useNavigate();

  const [magia, setMagia] = useState(null);
  const [magos, setMagos] = useState([]);
  const [magoSelecionado, setMagoSelecionado] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [mensagemAcao, setMensagemAcao] = useState("");
  const [tipoMensagemAcao, setTipoMensagemAcao] = useState("");

  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setMensagem("");

      try {
        const responseMagia = await dndApi.get(`/spells/${index}`);
        setMagia(responseMagia.data);

        const responseMagos = await api.get("?rota=magos&acao=listar");

        if (Array.isArray(responseMagos.data)) {
          setMagos(responseMagos.data);
        } else if (responseMagos.data.data) {
          setMagos(responseMagos.data.data);
        } else {
          setMagos([]);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes da magia:", error);

        if (isAuthError(error)) {
          navigate("/login");
          return;
        }

        setMensagem(
          getApiErrorMessage(error, "Erro ao carregar detalhes da magia.")
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [index, navigate]);

  function renderTextoFormatado(texto) {
    if (typeof texto !== "string") {
      return texto;
    }

    const linhas = texto.split("\n");

    return linhas.map((linha, linhaIndex) => {
      const partes = [];
      let textoNormal = "";
      let estiloAtual = null;
      let indice = 0;

      const adicionarTextoNormal = () => {
        if (textoNormal) {
          partes.push(
            <span key={`${linhaIndex}-${partes.length}`}>{textoNormal}</span>
          );
          textoNormal = "";
        }
      };

      const fecharEstilo = () => {
        if (textoNormal) {
          if (estiloAtual === "simples") {
            partes.push(
              <em key={`${linhaIndex}-${partes.length}`}>{textoNormal}</em>
            );
          } else {
            partes.push(
              <strong key={`${linhaIndex}-${partes.length}`}>{textoNormal}</strong>
            );
          }
          textoNormal = "";
        }
        estiloAtual = null;
      };

      while (indice < linha.length) {
        const caractere = linha[indice];

        if (caractere === "*") {
          const proximo = linha[indice + 1];
          const proximo2 = linha[indice + 2];

          if (proximo === "*" && proximo2 === "*") {
            if (estiloAtual === "triplo") {
              fecharEstilo();
              indice += 3;
              continue;
            }

            adicionarTextoNormal();
            estiloAtual = "triplo";
            indice += 3;
            continue;
          }

          if (proximo === "*") {
            if (estiloAtual === "duplo") {
              fecharEstilo();
              indice += 2;
              continue;
            }

            adicionarTextoNormal();
            estiloAtual = "duplo";
            indice += 2;
            continue;
          }

          if (estiloAtual === "simples") {
            fecharEstilo();
            indice += 1;
            continue;
          }

          adicionarTextoNormal();
          estiloAtual = "simples";
          indice += 1;
          continue;
        }

        textoNormal += caractere;
        indice += 1;
      }

      if (estiloAtual) {
        if (estiloAtual === "simples") {
          partes.push(
            <em key={`${linhaIndex}-${partes.length}`}>{textoNormal}</em>
          );
        } else {
          partes.push(
            <strong key={`${linhaIndex}-${partes.length}`}>{textoNormal}</strong>
          );
        }
      } else if (textoNormal) {
        partes.push(
          <span key={`${linhaIndex}-${partes.length}`}>{textoNormal}</span>
        );
      }

      return (
        <span key={linhaIndex}>
          {linhaIndex > 0 && <br />}
          {partes}
        </span>
      );
    });
  }

  function abrirModal() {
    setMensagemAcao("");
    setTipoMensagemAcao("");
    setMagoSelecionado("");
    setModalAberto(true);
  }

  function fecharModal() {
    if (carregandoAcao) {
      return;
    }

    setModalAberto(false);
    setMensagemAcao("");
    setTipoMensagemAcao("");
    setMagoSelecionado("");
  }

  function magoPodeAprender(mago) {
    return Number(mago.nivel) >= Number(magia.level);
  }

  async function aprenderMagia() {
    setMensagemAcao("");
    setTipoMensagemAcao("");

    if (!magoSelecionado) {
      setMensagemAcao("Selecione um mago antes de aprender a magia.");
      setTipoMensagemAcao("error");
      return;
    }

    const magoEscolhido = magos.find(
      (mago) => String(mago.id) === String(magoSelecionado)
    );

    if (!magoEscolhido) {
      setMensagemAcao("Mago selecionado não encontrado.");
      setTipoMensagemAcao("error");
      return;
    }

    if (!magoPodeAprender(magoEscolhido)) {
      setMensagemAcao("Este mago não possui nível suficiente para aprender esta magia.");
      setTipoMensagemAcao("error");
      return;
    }

    try {
      setCarregandoAcao(true);

      const response = await api.post("?rota=mago-magias&acao=aprender", {
        mago_id: Number(magoSelecionado),
        magia_index: magia.index,
        magia_nome: magia.name,
        nivel_minimo: magia.level,
      });

      setMensagemAcao(response.data.message || "Magia aprendida com sucesso.");
      setTipoMensagemAcao("success");
    } catch (error) {
      console.error("Erro ao aprender magia:", error);

      if (isAuthError(error)) {
        navigate("/login");
        return;
      }

      setMensagemAcao(getApiErrorMessage(error, "Erro ao aprender magia."));
      setTipoMensagemAcao("error");
    } finally {
      setCarregandoAcao(false);
    }
  }

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#07030f] text-white">
        <Header />

        <section className="flex min-h-[calc(100vh-84px)] items-center justify-center px-6">
          <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 px-8 py-6 text-purple-100 shadow-2xl shadow-purple-950/50">
            Carregando detalhes da magia...
          </div>
        </section>
      </main>
    );
  }

  if (mensagem || !magia) {
    return (
      <main className="min-h-screen bg-[#07030f] text-white">
        <Header />

        <section className="flex min-h-[calc(100vh-84px)] items-center justify-center px-6">
          <div className="max-w-xl rounded-2xl border border-red-400/40 bg-red-100 px-8 py-6 text-center text-red-800 shadow-2xl shadow-purple-950/50">
            <p>{mensagem || "Magia não encontrada."}</p>

            <Link
              to="/spellbook"
              className="mt-4 inline-block font-semibold text-red-900 underline"
            >
              Voltar ao Spellbook
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07030f] text-white">
      <Header />

      <section className="relative overflow-hidden px-6 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.28),_transparent_34%)]" />
        <div className="absolute -left-40 top-16 h-96 w-96 rounded-full border border-purple-400/10" />
        <div className="absolute right-10 top-32 h-[460px] w-[460px] rounded-full border border-purple-300/10" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <section className="mb-6 rounded-2xl border border-purple-300/20 bg-purple-950/35 px-6 py-5 shadow-xl shadow-purple-950/30">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Link
                  to="/spellbook"
                  className="mb-3 inline-block text-sm font-semibold text-purple-200/70 transition hover:text-[#f5e7c8]"
                >
                  ← Voltar ao Spellbook
                </Link>

                <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-purple-300/60">
                  FICHA DE MAGIA
                </p>

                <h1 className="font-serif text-4xl text-[#f5e7c8] drop-shadow-[0_0_14px_rgba(216,180,254,0.2)]">
                  {magia.name}
                </h1>

                <p className="mt-2 text-sm text-purple-100/60">
                  {magia.school?.name || "Escola desconhecida"} • Nível{" "}
                  {magia.level}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-xl border border-purple-300/20 bg-[#12091f]/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/50">
                Alcance
              </p>
              <p className="mt-2 text-sm font-semibold text-[#f5e7c8]">
                {magia.range}
              </p>
            </div>

            <div className="rounded-xl border border-purple-300/20 bg-[#12091f]/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/50">
                Duração
              </p>
              <p className="mt-2 text-sm font-semibold text-[#f5e7c8]">
                {magia.duration}
              </p>
            </div>

            <div className="rounded-xl border border-purple-300/20 bg-[#12091f]/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/50">
                Conjuração
              </p>
              <p className="mt-2 text-sm font-semibold text-[#f5e7c8]">
                {magia.casting_time}
              </p>
            </div>

            <div className="rounded-xl border border-purple-300/20 bg-[#12091f]/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-purple-300/50">
                Componentes
              </p>
              <p className="mt-2 text-sm font-semibold text-[#f5e7c8]">
                {magia.components?.join(", ") || "—"}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <article className="rounded-2xl border border-[#c8a978]/40 bg-[#efe6da] p-6 text-[#21172f] shadow-xl shadow-purple-950/30">
                <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-purple-700/70">
                  DESCRIÇÃO
                </p>

                <h2 className="font-serif text-3xl text-[#20122f]">Efeito</h2>

                <div className="my-5 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

                <div className="space-y-4 text-base leading-relaxed text-[#4d4058]">
                  {magia.desc?.map((texto, descIndex) => (
                    <p key={descIndex}>{renderTextoFormatado(texto)}</p>
                  ))}
                </div>

                {magia.higher_level && magia.higher_level.length > 0 && (
                  <section className="mt-6 rounded-2xl border border-[#c8a978]/40 bg-white/50 p-5">
                    <h3 className="font-serif text-2xl text-[#20122f]">
                      Em níveis superiores
                    </h3>

                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#4d4058]">
                      {magia.higher_level.map((texto, levelIndex) => (
                        <p key={levelIndex}>{renderTextoFormatado(texto)}</p>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              {magia.material && (
                <section className="rounded-2xl border border-purple-300/20 bg-purple-950/35 p-5 shadow-xl shadow-purple-950/30">
                  <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-purple-300/70">
                    MATERIAL
                  </p>

                  <h2 className="font-serif text-2xl text-[#f5e7c8]">
                    Componente material
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-purple-100/70">
                    {magia.material}
                  </p>
                </section>
              )}
            </div>

            <aside className="space-y-5">
              <section className="rounded-2xl border border-purple-300/20 bg-purple-950/35 p-5 shadow-xl shadow-purple-950/30">
                <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-purple-300/70">
                  RESUMO
                </p>

                <h2 className="font-serif text-2xl text-[#f5e7c8]">
                  Dados rápidos
                </h2>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl border border-purple-300/20 bg-[#0d0618]/80 px-4 py-3">
                    <span className="text-purple-100/50">Nível</span>
                    <strong className="text-[#f5e7c8]">{magia.level}</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-purple-300/20 bg-[#0d0618]/80 px-4 py-3">
                    <span className="text-purple-100/50">Escola</span>
                    <strong className="text-right text-[#f5e7c8]">
                      {magia.school?.name || "—"}
                    </strong>
                  </div>

                  {magia.damage?.damage_type?.name && (
                    <div className="flex items-center justify-between rounded-xl border border-purple-300/20 bg-[#0d0618]/80 px-4 py-3">
                      <span className="text-purple-100/50">Dano</span>
                      <strong className="text-[#f5e7c8]">
                        {magia.damage.damage_type.name}
                      </strong>
                    </div>
                  )}

                  {magia.attack_type && (
                    <div className="flex items-center justify-between rounded-xl border border-purple-300/20 bg-[#0d0618]/80 px-4 py-3">
                      <span className="text-purple-100/50">Ataque</span>
                      <strong className="text-[#f5e7c8]">
                        {magia.attack_type}
                      </strong>
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-[#c8a978]/40 bg-[#efe6da] p-5 text-[#21172f] shadow-xl shadow-purple-950/30">
                <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-purple-700/70">
                  APRENDIZADO
                </p>

                <h2 className="font-serif text-2xl text-[#20122f]">
                  Ensinar magia
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#6b5d75]">
                  Escolha um mago da sua guilda. Ele precisa ter nível igual ou
                  maior que <strong>{magia.level}</strong>.
                </p>

                <div className="my-5 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-purple-300/40 bg-purple-100 px-3 py-2 text-xs text-purple-800">
                    {magia.ritual ? "Ritual" : "Não ritual"}
                  </span>

                  <span className="rounded-full border border-purple-300/40 bg-purple-100 px-3 py-2 text-xs text-purple-800">
                    {magia.concentration
                      ? "Concentração"
                      : "Sem concentração"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={abrirModal}
                  className="mt-5 w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-3 font-serif text-sm tracking-[0.18em] text-[#f5e7c8] shadow-lg shadow-purple-900/20 transition hover:brightness-125"
                >
                  APRENDER
                </button>
              </section>
            </aside>
          </section>
        </div>
      </section>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-3xl rounded-[2rem] border border-purple-300/20 bg-purple-950 p-5 shadow-2xl shadow-purple-950/70">
            <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-6 text-[#21172f]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-purple-700/70">
                    ENSINAR MAGIA
                  </p>

                  <h2 className="font-serif text-3xl text-[#20122f]">
                    Escolha um mago
                  </h2>

                  <p className="mt-2 text-sm text-[#6b5d75]">
                    Selecione quem tentará aprender{" "}
                    <strong>{magia.name}</strong>. Nível mínimo:{" "}
                    <strong>{magia.level}</strong>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={carregandoAcao}
                  className="rounded-full border border-[#c8a978]/50 px-4 py-2 text-purple-800 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  X
                </button>
              </div>

              <div className="my-5 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

              {magos.length === 0 ? (
                <div className="rounded-2xl border border-[#c8a978]/40 bg-white/50 p-5 text-center text-sm text-[#6b5d75]">
                  Nenhum mago cadastrado na sua guilda.
                </div>
              ) : (
                <div className="max-h-[320px] space-y-3 overflow-y-auto pr-2">
                  {magos.map((mago) => (
                    <button
                      key={mago.id}
                      type="button"
                      disabled={carregandoAcao}
                      onClick={() => setMagoSelecionado(String(mago.id))}
                      className={`w-full rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-70 ${
                        magoSelecionado === String(mago.id)
                          ? "border-purple-700 bg-purple-100"
                          : "border-[#c8a978]/40 bg-white/50 hover:bg-purple-50"
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-serif text-xl text-[#20122f]">
                            {mago.nome}
                          </h3>

                          <p className="mt-1 text-sm text-[#6b5d75]">
                            Nível {mago.nivel}
                          </p>
                        </div>

                        {magoPodeAprender(mago) ? (
                          <span className="rounded-full border border-green-400/50 bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                            Pode aprender
                          </span>
                        ) : (
                          <span className="rounded-full border border-red-400/50 bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
                            Nível insuficiente
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-5 min-h-[52px]">
                {mensagemAcao && (
                  <div
                    className={`flex items-center justify-center rounded-xl border px-4 py-3 text-center text-sm font-medium shadow-sm ${
                      tipoMensagemAcao === "success"
                        ? "border-green-400/60 bg-green-100 text-green-800"
                        : "border-red-400/60 bg-red-100 text-red-800"
                    }`}
                  >
                    <span className="mr-2">
                      {tipoMensagemAcao === "success" ? "✓" : "⚠"}
                    </span>
                    {mensagemAcao}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={aprenderMagia}
                  disabled={magos.length === 0 || carregandoAcao}
                  className="w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-3 font-serif text-sm tracking-[0.18em] text-[#f5e7c8] shadow-lg shadow-purple-900/20 transition hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
                >
                  {carregandoAcao ? "ENSINANDO..." : "CONFIRMAR"}
                </button>

                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={carregandoAcao}
                  className="w-full rounded-xl border border-purple-300/40 bg-white/40 px-5 py-3 font-serif text-sm tracking-[0.18em] text-purple-900 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MagiaDetalhe;