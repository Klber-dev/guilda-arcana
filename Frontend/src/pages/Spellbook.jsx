import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import dndApi from "../services/dndApi";

function Spellbook() {
  const [magias, setMagias] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const itensPorPagina = 18;

  useEffect(() => {
    async function carregarMagias() {
      setCarregando(true);
      setMensagem("");

      try {
        const response = await dndApi.get("/spells");
        setMagias(response.data.results || []);
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao carregar magias.");
      } finally {
        setCarregando(false);
      }
    }

    carregarMagias();
  }, []);

  const magiasFiltradas = magias.filter((magia) =>
    magia.name.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(magiasFiltradas.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const magiasDaPagina = magiasFiltradas.slice(inicio, fim);

  function mudarBusca(event) {
    setBusca(event.target.value);
    setPaginaAtual(1);
  }

  function paginaAnterior() {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  function proximaPagina() {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
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
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-purple-300/70">
                LIVRO DE MAGIAS
              </p>

              <h1 className="font-serif text-6xl text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.35)]">
                Spellbook
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-purple-100/75">
                Consulte o catálogo de magias disponíveis e veja quais
                conhecimentos podem ser associados aos magos da sua guilda.
              </p>
            </div>

            <div className="w-full lg:max-w-sm">
              <label
                htmlFor="busca"
                className="mb-2 block text-sm font-medium text-purple-100/80"
              >
                Buscar magia
              </label>

              <input
                id="busca"
                type="text"
                value={busca}
                onChange={mudarBusca}
                placeholder="Ex: Acid Arrow"
                className="w-full rounded-xl border border-purple-300/20 bg-purple-950/50 px-5 py-4 text-purple-50 outline-none transition placeholder:text-purple-200/40 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {carregando ? (
            <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 px-8 py-6 text-purple-100 shadow-2xl shadow-purple-950/50">
              Carregando magias...
            </div>
          ) : mensagem ? (
            <div className="rounded-2xl border border-red-400/40 bg-red-100 px-8 py-6 text-red-800 shadow-2xl shadow-purple-950/50">
              {mensagem}
            </div>
          ) : (
            <>
              <section className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-6 shadow-2xl shadow-purple-950/50">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.25em] text-purple-300/70">
                      CATÁLOGO
                    </p>

                    <h2 className="mt-2 font-serif text-4xl text-[#f5e7c8]">
                      Magias disponíveis
                    </h2>
                  </div>

                  <p className="text-sm text-purple-100/60">
                    {magiasFiltradas.length} magia(s) encontrada(s)
                  </p>
                </div>

                {magiasDaPagina.length === 0 ? (
                  <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-8 text-center text-purple-100/70">
                    Nenhuma magia encontrada.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {magiasDaPagina.map((magia) => (
                      <Link
                        key={magia.index}
                        to={`/spellbook/${magia.index}`}
                        className="group rounded-2xl border border-purple-300/20 bg-purple-950/40 p-6 shadow-lg shadow-purple-950/20 transition hover:border-[#c8a978]/60 hover:bg-purple-900/40"
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 text-2xl text-purple-200">
                            ✶
                          </div>

                          <span className="rounded-full border border-purple-300/20 bg-purple-900/40 px-4 py-2 text-sm text-purple-100/70">
                            Nível {magia.level}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl text-[#f5e7c8] transition group-hover:text-white">
                          {magia.name}
                        </h3>

                        <p className="mt-3 text-sm text-purple-100/60">
                          Índice: {magia.index}
                        </p>

                        <div className="mt-6 h-px w-full bg-gradient-to-r from-purple-300/40 via-[#c8a978]/40 to-transparent" />

                        <p className="mt-4 text-sm font-medium text-purple-200/80">
                          Ver detalhes
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {totalPaginas > 1 && (
                <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-purple-300/20 bg-purple-950/40 p-5 shadow-xl shadow-purple-950/30 sm:flex-row">
                  <button
                    type="button"
                    onClick={paginaAnterior}
                    disabled={paginaAtual === 1}
                    className="rounded-xl border border-purple-300/30 px-5 py-3 text-sm text-purple-100 transition hover:bg-purple-900/50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Página anterior
                  </button>

                  <p className="text-sm text-purple-100/70">
                    Página {paginaAtual} de {totalPaginas}
                  </p>

                  <button
                    type="button"
                    onClick={proximaPagina}
                    disabled={paginaAtual === totalPaginas}
                    className="rounded-xl border border-purple-300/30 px-5 py-3 text-sm text-purple-100 transition hover:bg-purple-900/50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próxima página
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Spellbook;