import Header from "../components/Header";

function Sobre() {
  return (
    <main className="min-h-screen bg-[#07030f] text-white">
      <Header />

      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(88,28,135,0.35),_transparent_35%)]" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full border border-purple-400/10" />
        <div className="absolute right-10 top-28 h-[520px] w-[520px] rounded-full border border-purple-300/10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-purple-700/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-purple-300/30 bg-purple-500/10 text-4xl text-purple-200 shadow-lg shadow-purple-600/30">
              ✦
            </div>

            <p className="mb-4 text-sm font-semibold tracking-[0.35em] text-purple-300/70">
              INFORMAÇÕES DO PROJETO
            </p>

            <h1 className="font-serif text-6xl text-[#f5e7c8] drop-shadow-[0_0_18px_rgba(216,180,254,0.35)]">
              Sobre a Guilda Arcana
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-purple-100/75">
              Página destinada aos créditos, informações acadêmicas e descrição
              geral do sistema desenvolvido.
            </p>

            <div className="mx-auto mt-8 h-px w-96 bg-gradient-to-r from-transparent via-[#c8a978] to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-6 shadow-2xl shadow-purple-950/50 backdrop-blur">
              <div className="rounded-[1.5rem] border border-[#c8a978]/40 bg-[#efe6da] p-8 text-[#21172f]">
                <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-purple-700/70">
                  CRÉDITOS
                </p>

                <h2 className="font-serif text-4xl text-[#20122f]">
                  Informações do Aluno
                </h2>

                <div className="my-7 h-px w-full bg-gradient-to-r from-[#c8a978] via-[#c8a978]/60 to-transparent" />

                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700/70">
                      Nome
                    </p>
                    <p className="mt-1 text-lg text-[#32243f]">
                      Kleber Luan
                      222626
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700/70">
                      Curso
                    </p>
                    <p className="mt-1 text-lg text-[#32243f]">
                      Tecnologia em Análise e Desenvolvimento de Sistemas
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700/70">
                      Disciplina
                    </p>
                    <p className="mt-1 text-lg text-[#32243f]">
                      Laboratório de programação III, Analise e projeto orientado a objetos
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700/70">
                      Professor
                    </p>
                    <p className="mt-1 text-lg text-[#32243f]">
                      James Clauton Da Silva, Sergio Luis Tonsig
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700/70">
                      Instituição
                    </p>
                    <p className="mt-1 text-lg text-[#32243f]">
                      Centro Universitário Católico Salesiano Auxilium
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="rounded-[2rem] border border-purple-300/20 bg-purple-950/40 p-8 shadow-2xl shadow-purple-950/50">
                <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-purple-300/70">
                  PROJETO
                </p>

                <h2 className="font-serif text-4xl text-[#f5e7c8]">
                  Guilda Arcana
                </h2>

                <p className="mt-5 leading-relaxed text-purple-100/75">
                  A Guilda Arcana é um sistema web desenvolvido com o objetivo
                  de gerenciar uma guilda fictícia de magos. O projeto permite
                  cadastro de usuários, criação e gerenciamento de guilda,
                  cadastro de magos e associação de magias através de um
                  spellbook.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-6">
                  <div className="mb-4 text-3xl text-purple-300">◇</div>
                  <h3 className="font-serif text-2xl text-[#f5e7c8]">
                    Backend
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-purple-100/70">
                    PHP, PDO, MariaDB, estrutura MVC, controllers, models,
                    sessões e respostas JSON.
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-6">
                  <div className="mb-4 text-3xl text-purple-300">✧</div>
                  <h3 className="font-serif text-2xl text-[#f5e7c8]">
                    Frontend
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-purple-100/70">
                    React, React Router, Axios e Tailwind CSS para construção
                    das interfaces.
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-6">
                  <div className="mb-4 text-3xl text-purple-300">✶</div>
                  <h3 className="font-serif text-2xl text-[#f5e7c8]">
                    Tema
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-purple-100/70">
                    Sistema inspirado em fantasia, RPG, grimórios, guildas e
                    administração de magos.
                  </p>
                </div>

                <div className="rounded-2xl border border-purple-300/20 bg-purple-950/40 p-6">
                  <div className="mb-4 text-3xl text-purple-300">✦</div>
                  <h3 className="font-serif text-2xl text-[#f5e7c8]">
                    Objetivo
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-purple-100/70">
                    Demonstrar integração entre frontend e backend, persistência
                    em banco de dados e organização em camadas.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sobre;