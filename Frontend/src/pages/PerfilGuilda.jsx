import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";

function PerfilGuilda() {
  const [guilda, setGuilda] = useState(null);
  const [magos, setMagos] = useState([]);
  const [nomeGuilda, setNomeGuilda] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [modalMagiasAberto, setModalMagiasAberto] = useState(false);
  const [magoDasMagias, setMagoDasMagias] = useState(null);
  const [magiasDoMago, setMagiasDoMago] = useState([]);
  const [carregandoMagiasMago, setCarregandoMagiasMago] = useState(false);
  const [mensagemMagiasMago, setMensagemMagiasMago] = useState("");

  function formatarNomeMagia(nome) {
    return nome
      .split("-")
      .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
      .join(" ");
  }

  async function buscarMagos() {
    try {
      const response = await api.get("?rota=magos&acao=listar");

      if (response.data.error) {
        setMagos([]);
        return;
      }

      if (Array.isArray(response.data)) {
        setMagos(response.data);
      } else if (response.data.data) {
        setMagos(response.data.data);
      } else {
        setMagos([]);
      }
    } catch (error) {
      console.error(error);
      setMagos([]);
    }
  }

  async function buscarGuilda() {
    setCarregando(true);
    setMensagem("");

    try {
      const response = await api.get("?rota=guildas&acao=buscar");

      if (response.data.error) {
        setGuilda(null);
        setMagos([]);
        return;
      }

      setGuilda(response.data);
      await buscarMagos();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao buscar guilda.");
    } finally {
      setCarregando(false);
    }
  }

  async function criarGuilda(event) {
    event.preventDefault();
    setMensagem("");

    if (!nomeGuilda) {
      setMensagem("Informe o nome da guilda.");
      return;
    }

    try {
      const response = await api.post("?rota=guildas&acao=criar", {
        nome: nomeGuilda,
      });

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      if (response.data.guilda) {
        setGuilda(response.data.guilda);
      } else if (response.data.data) {
        setGuilda(response.data.data);
      }

      setNomeGuilda("");
      setMensagem(response.data.message || "Guilda criada com sucesso.");
      await buscarMagos();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao criar guilda.");
    }
  }

  async function atualizarGuilda(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const response = await api.post("?rota=guildas&acao=atualizar", {
        nome: guilda.nome,
        dinheiro: guilda.dinheiro,
        espaco: guilda.espaco,
        reputacao: guilda.reputacao,
      });

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      if (response.data.guilda) {
        setGuilda(response.data.guilda);
      } else if (response.data.data) {
        setGuilda(response.data.data);
      }

      setMensagem(response.data.message || "Guilda atualizada com sucesso.");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao atualizar guilda.");
    }
  }

  async function excluirGuilda() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua guilda? Todos os magos vinculados a ela também serão removidos."
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await api.post("?rota=guildas&acao=excluir");

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      setGuilda(null);
      setMagos([]);
      setMensagem(response.data.message || "Guilda excluída com sucesso.");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao excluir guilda.");
    }
  }

  async function atualizarNivelMago(id, nivel) {
    setMensagem("");

    if (!nivel || nivel < 1) {
      setMensagem("O nível do mago precisa ser maior que zero.");
      return;
    }

    try {
      const response = await api.post("?rota=magos&acao=atualizarNivel", {
        id,
        nivel,
      });

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      setMensagem(response.data.message || "Nível do mago atualizado com sucesso.");
      await buscarMagos();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao atualizar nível do mago.");
    }
  }

  async function excluirMago(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este mago?");

    if (!confirmar) {
      return;
    }

    setMensagem("");

    try {
      const response = await api.post("?rota=magos&acao=apagar", {
        id,
      });

      if (response.data.error) {
        setMensagem(response.data.error);
        return;
      }

      setMensagem(response.data.message || "Mago excluído com sucesso.");
      await buscarGuilda();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao excluir mago.");
    }
  }

  async function abrirMagiasDoMago(mago) {
    setModalMagiasAberto(true);
    setMagoDasMagias(mago);
    setMagiasDoMago([]);
    setMensagemMagiasMago("");
    setCarregandoMagiasMago(true);

    try {
      const response = await api.post("?rota=mago-magias&acao=listar", {
        mago_id: mago.id,
      });

      if (response.data.error) {
        setMensagemMagiasMago(response.data.error);
        return;
      }

      setMagiasDoMago(response.data.data || []);
    } catch (error) {
      console.error(error);
      setMensagemMagiasMago("Erro ao carregar magias do mago.");
    } finally {
      setCarregandoMagiasMago(false);
    }
  }

  function fecharModalMagias() {
    setModalMagiasAberto(false);
    setMagoDasMagias(null);
    setMagiasDoMago([]);
    setMensagemMagiasMago("");
  }

  useEffect(() => {
    buscarGuilda();
  }, []);

  if (carregando) {
    return (
      <main className="min-h-screen bg-[#07030f] text-white">
        <Header />

        <section className="flex min-h-[calc(100vh-84px)] items-center justify-center px-6">
          <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 px-8 py-6 text-purple-100 shadow-2xl shadow-purple-950/50">
            Carregando dados da guilda...
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07030f] text-white">
      <Header />

      <section className="relative overflow-hidden px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.24),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.32),_transparent_35%)]" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full border border-purple-400/10" />
        <div className="absolute right-12 top-28 h-[520px] w-[520px] rounded-full border border-purple-300/10" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {!guilda ? (
            <section className="mx-auto max-w-3xl rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-6 shadow-2xl shadow-purple-950/50">
              <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-10 text-[#21172f]">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#c8a978]/60 bg-[#efe6da] text-4xl text-purple-700 shadow-md">
                    ◇
                  </div>

                  <p className="mb-4 text-sm font-semibold tracking-[0.35em] text-purple-700/70">
                    PRIMEIRA FUNDAÇÃO
                  </p>

                  <h1 className="font-serif text-5xl text-[#20122f]">
                    Nomeie sua Guilda
                  </h1>

                  <p className="mx-auto mt-4 max-w-xl text-[#6b5d75]">
                    Antes de gerenciar magos e magias, você precisa fundar sua
                    guilda. Escolha um nome para iniciar sua jornada arcana.
                  </p>

                  <div className="mx-auto mt-8 h-px w-80 bg-gradient-to-r from-transparent via-[#c8a978] to-transparent" />
                </div>

                <form onSubmit={criarGuilda} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nomeGuilda"
                      className="mb-2 block font-medium text-[#32243f]"
                    >
                      Nome da guilda
                    </label>

                    <input
                      id="nomeGuilda"
                      type="text"
                      value={nomeGuilda}
                      onChange={(event) => setNomeGuilda(event.target.value)}
                      placeholder="Ex: Ordem do Éter"
                      className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition placeholder:text-[#9b8fa7] focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.25em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125"
                  >
                    FUNDAR GUILDA
                  </button>
                </form>

                <div className="mt-6 min-h-[56px]">
                  {mensagem && (
                    <div className="flex items-center justify-center rounded-xl border border-red-400/60 bg-red-100 px-4 py-3 text-center text-sm font-medium text-red-800 shadow-sm">
                      <span className="mr-2">⚠</span>
                      {mensagem}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="mb-8 rounded-[2rem] border border-purple-300/20 bg-purple-950/35 p-8 shadow-2xl shadow-purple-950/40">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-purple-300/70">
                      PAINEL DA GUILDA
                    </p>

                    <h1 className="font-serif text-5xl text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.25)]">
                      {guilda.nome}
                    </h1>

                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-purple-100/70">
                      Gerencie seus recursos, acompanhe os membros da guilda e
                      organize o crescimento dos seus magos.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                  </div>
                </div>
              </section>

              {mensagem && (
                <div className="mb-8 rounded-2xl border border-purple-300/30 bg-purple-100 px-5 py-4 text-center text-sm font-medium text-purple-900">
                  {mensagem}
                </div>
              )}

              <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-purple-300/20 bg-[#12091f]/85 p-6 shadow-xl shadow-purple-950/30">
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-300/60">
                    Cofre
                  </p>
                  <p className="mt-3 font-serif text-5xl text-[#f5e7c8]">
                    {guilda.dinheiro}
                  </p>
                  <p className="mt-2 text-sm text-purple-100/50">
                    Dinheiro disponível
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-[#12091f]/85 p-6 shadow-xl shadow-purple-950/30">
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-300/60">
                    Espaço
                  </p>
                  <p className="mt-3 font-serif text-5xl text-[#f5e7c8]">
                    {guilda.espaco}
                  </p>
                  <p className="mt-2 text-sm text-purple-100/50">
                    Vagas restantes
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-[#12091f]/85 p-6 shadow-xl shadow-purple-950/30">
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-300/60">
                    Prestígio
                  </p>
                  <p className="mt-3 font-serif text-5xl text-[#f5e7c8]">
                    {guilda.reputacao}
                  </p>
                  <p className="mt-2 text-sm text-purple-100/50">
                    Reputação pública
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-[#12091f]/85 p-6 shadow-xl shadow-purple-950/30">
                  <p className="text-sm uppercase tracking-[0.25em] text-purple-300/60">
                    Magos
                  </p>
                  <p className="mt-3 font-serif text-5xl text-[#f5e7c8]">
                    {magos.length}
                  </p>
                  <p className="mt-2 text-sm text-purple-100/50">
                    Membros cadastrados
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
                <div className="rounded-[2rem] border border-purple-300/20 bg-purple-950/35 p-6 shadow-2xl shadow-purple-950/40">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold tracking-[0.25em] text-purple-300/70">
                        MEMBROS
                      </p>

                      <h2 className="mt-2 font-serif text-4xl text-[#f5e7c8]">
                        Magos da Guilda
                      </h2>
                    </div>

                    <Link
                      to="/magos/cadastrar"
                      className="rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-3 text-center font-serif text-sm tracking-[0.18em] text-[#f5e7c8] shadow-lg shadow-purple-900/30 transition hover:brightness-125"
                    >
                      ADICIONAR
                    </Link>
                  </div>

                  {magos.length === 0 ? (
                    <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-10 text-center">
                      <p className="font-serif text-3xl text-[#f5e7c8]">
                        Nenhum mago cadastrado
                      </p>
                      <p className="mt-3 text-purple-100/60">
                        Cadastre o primeiro membro para iniciar sua guilda.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {magos.map((mago) => (
                        <div
                          key={mago.id}
                          className="rounded-2xl border border-purple-300/20 bg-[#0d0618]/80 p-5 shadow-lg shadow-purple-950/20"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 text-2xl text-purple-200">
                                ✧
                              </div>

                              <div>
                                <h3 className="font-serif text-2xl text-[#f5e7c8]">
                                  {mago.nome}
                                </h3>

                                <p className="mt-1 text-sm text-purple-100/50">
                                  ID #{mago.id} • Nível {mago.nivel}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={() => abrirMagiasDoMago(mago)}
                                className="rounded-full border border-purple-300/20 bg-purple-900/40 px-4 py-2 text-sm text-purple-100 transition hover:bg-purple-800/50"
                              >
                                Ver magias
                              </button>

                              <button
                                type="button"
                                onClick={() => excluirMago(mago.id)}
                                className="rounded-full border border-red-400/30 bg-red-950/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-900/40"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>

                          <div className="mt-5 rounded-2xl border border-purple-300/10 bg-purple-950/30 p-4">
                            <p className="mb-3 text-sm text-purple-200/60">
                              Atualizar nível do mago
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row">
                              <input
                                type="number"
                                min="1"
                                defaultValue={mago.nivel}
                                id={`nivel-mago-${mago.id}`}
                                className="w-full rounded-xl border border-purple-300/20 bg-purple-950/60 px-4 py-3 text-purple-50 outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 sm:w-32"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  const input = document.getElementById(
                                    `nivel-mago-${mago.id}`
                                  );

                                  atualizarNivelMago(
                                    mago.id,
                                    Number(input.value)
                                  );
                                }}
                                className="rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-3 font-serif text-sm tracking-[0.15em] text-[#f5e7c8] transition hover:brightness-125"
                              >
                                Atualizar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <aside className="space-y-6">
                  <section className="rounded-[2rem] border border-[#c8a978]/40 bg-[#efe6da] p-6 text-[#21172f] shadow-2xl shadow-purple-950/40">
                    <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-purple-700/70">
                      EDIÇÃO
                    </p>

                    <h2 className="font-serif text-4xl text-[#20122f]">
                      Dados da Guilda
                    </h2>

                    <p className="mt-3 text-[#6b5d75]">
                      Atualize os atributos principais da guilda.
                    </p>

                    <div className="my-7 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

                    <form onSubmit={atualizarGuilda} className="space-y-5">
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
                          value={guilda.nome}
                          onChange={(event) =>
                            setGuilda({
                              ...guilda,
                              nome: event.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="dinheiro"
                          className="mb-2 block font-medium text-[#32243f]"
                        >
                          Dinheiro
                        </label>

                        <input
                          id="dinheiro"
                          type="number"
                          value={guilda.dinheiro}
                          onChange={(event) =>
                            setGuilda({
                              ...guilda,
                              dinheiro: Number(event.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="espaco"
                          className="mb-2 block font-medium text-[#32243f]"
                        >
                          Espaço
                        </label>

                        <input
                          id="espaco"
                          type="number"
                          value={guilda.espaco}
                          onChange={(event) =>
                            setGuilda({
                              ...guilda,
                              espaco: Number(event.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="reputacao"
                          className="mb-2 block font-medium text-[#32243f]"
                        >
                          Reputação
                        </label>

                        <input
                          id="reputacao"
                          type="number"
                          value={guilda.reputacao}
                          onChange={(event) =>
                            setGuilda({
                              ...guilda,
                              reputacao: Number(event.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-[#cbbfd4] bg-white/70 px-5 py-4 text-[#20122f] outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-300/30"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.2em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125"
                      >
                        SALVAR
                      </button>
                    </form>
                  </section>

                  <section className="rounded-[2rem] border border-red-400/20 bg-red-950/20 p-6">
                    <p className="mb-2 text-sm font-semibold tracking-[0.25em] text-red-200/70">
                      ZONA DE PERIGO
                    </p>

                    <h3 className="font-serif text-2xl text-red-100">
                      Excluir Guilda
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-red-100/60">
                      Remove a guilda e todos os magos vinculados a ela.
                    </p>

                    <button
                      type="button"
                      onClick={excluirGuilda}
                      className="mt-5 w-full rounded-xl border border-red-400/30 bg-red-950/40 px-5 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-900/50"
                    >
                      Excluir guilda
                    </button>
                  </section>
                </aside>
              </section>
            </>
          )}
        </div>
      </section>

      {modalMagiasAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-3xl rounded-[2rem] border border-purple-300/20 bg-purple-950 p-6 shadow-2xl shadow-purple-950/70">
            <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-8 text-[#21172f]">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-semibold tracking-[0.25em] text-purple-700/70">
                    MAGIAS DO MAGO
                  </p>

                  <h2 className="font-serif text-4xl text-[#20122f]">
                    {magoDasMagias?.nome}
                  </h2>

                  <p className="mt-3 text-[#6b5d75]">
                    Lista de magias aprendidas por este mago.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fecharModalMagias}
                  className="rounded-full border border-[#c8a978]/50 px-4 py-2 text-purple-800 transition hover:bg-purple-100"
                >
                  X
                </button>
              </div>

              <div className="my-6 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

              {carregandoMagiasMago ? (
                <div className="rounded-2xl border border-[#c8a978]/40 bg-white/50 p-6 text-center text-[#6b5d75]">
                  Carregando magias...
                </div>
              ) : mensagemMagiasMago ? (
                <div className="rounded-2xl border border-red-400/50 bg-red-100 p-6 text-center text-red-800">
                  {mensagemMagiasMago}
                </div>
              ) : magiasDoMago.length === 0 ? (
                <div className="rounded-2xl border border-[#c8a978]/40 bg-white/50 p-6 text-center text-[#6b5d75]">
                  Este mago ainda não aprendeu nenhuma magia.
                </div>
              ) : (
                <div className="max-h-[360px] space-y-4 overflow-y-auto pr-2">
                  {magiasDoMago.map((magia) => (
                    <div
                      key={magia.id}
                      className="flex flex-col gap-3 rounded-2xl border border-[#c8a978]/40 bg-white/50 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <h3 className="font-serif text-2xl text-[#20122f]">
                          {formatarNomeMagia(magia.nome)}
                        </h3>

                        <p className="mt-1 text-sm text-[#6b5d75]">
                          Nível mínimo: {magia.nivel_minimo}
                        </p>
                      </div>

                      <Link
                        to={`/spellbook/${magia.nome}`}
                        className="rounded-xl border border-purple-300/40 bg-purple-100 px-4 py-2 text-center text-sm font-medium text-purple-800 transition hover:bg-purple-200"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <button
                  type="button"
                  onClick={fecharModalMagias}
                  className="w-full rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-5 py-4 font-serif text-lg tracking-[0.2em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125"
                >
                  FECHAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default PerfilGuilda;