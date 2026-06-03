import { Link } from "react-router-dom";
import Header from "../components/Header";

function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07030f] text-white">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.32),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.38),_transparent_35%)]" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full border border-purple-400/10" />
        <div className="absolute right-10 top-28 h-[520px] w-[520px] rounded-full border border-purple-300/10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-purple-700/20 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-purple-300/20 bg-purple-950/40 px-5 py-3 text-sm text-purple-100/80">
              <span className="text-purple-300">✦</span>
              Sistema acadêmico de gestão arcana
            </div>

            <p className="mb-3 font-serif text-4xl tracking-[0.35em] text-purple-100">
              GUILDA
            </p>

            <h1 className="font-serif text-7xl leading-none text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.35)] sm:text-8xl">
              ARCANA
            </h1>

            <div className="my-8 h-px w-full max-w-xl bg-gradient-to-r from-purple-300/70 via-[#c8a978] to-transparent" />

            <h2 className="max-w-2xl font-serif text-3xl text-[#f5e7c8]">
              Uma plataforma para administrar sua guilda, seus magos e seus
              conhecimentos mágicos.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-purple-100/75">
              Organize os dados da sua guilda, cadastre magos, acompanhe
              recursos e gerencie magias em um sistema inspirado em fantasia,
              RPG e grimórios arcanos.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="rounded-xl border border-[#c8a978] bg-gradient-to-r from-purple-950 via-purple-800 to-purple-950 px-7 py-4 text-center font-serif text-base tracking-[0.2em] text-[#f5e7c8] shadow-xl shadow-purple-900/30 transition hover:brightness-125"
              >
                ENTRAR NA GUILDA
              </Link>

              <Link
                to="/cadastro"
                className="rounded-xl border border-purple-300/30 bg-purple-950/40 px-7 py-4 text-center font-serif text-base tracking-[0.15em] text-purple-100 transition hover:bg-purple-900/50"
              >
                CRIAR CONTA
              </Link>
            </div>
          </section>

          <section className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-6 shadow-2xl shadow-purple-950/50 backdrop-blur">
            <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-8 text-[#21172f]">
              <div className="mb-8 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c8a978]/60 bg-[#efe6da] text-4xl text-purple-700 shadow-md">
                  ✦
                </div>
              </div>

              <p className="mb-3 text-center text-sm font-semibold tracking-[0.35em] text-purple-700/70">
                GRIMÓRIO DIGITAL
              </p>

              <h2 className="text-center font-serif text-4xl text-[#20122f]">
                Controle sua jornada arcana
              </h2>

              <p className="mt-4 text-center leading-relaxed text-[#6b5d75]">
                O sistema reúne as principais ações da guilda em uma interface
                simples, organizada e preparada para evoluir.
              </p>

              <div className="mx-auto my-8 h-px w-72 bg-gradient-to-r from-transparent via-[#c8a978] to-transparent" />

              <div className="grid gap-4">
                <div className="rounded-2xl border border-[#c8a978]/40 bg-white/50 p-5">
                  <h3 className="font-serif text-xl text-[#20122f]">
                    Gestão da Guilda
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b5d75]">
                    Atualize nome, dinheiro, espaço e reputação da sua guilda.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#c8a978]/40 bg-white/50 p-5">
                  <h3 className="font-serif text-xl text-[#20122f]">
                    Cadastro de Magos
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b5d75]">
                    Registre novos magos e acompanhe o nível de cada integrante.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#c8a978]/40 bg-white/50 p-5">
                  <h3 className="font-serif text-xl text-[#20122f]">
                    Spellbook
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b5d75]">
                    Consulte magias e associe conhecimentos aos seus magos.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;