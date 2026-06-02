import { Link } from "react-router-dom";

function AuthHeader() {
  return (
    <header className="border-b border-purple-900/50 bg-[#10061f]/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
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

        <p className="hidden text-sm tracking-[0.25em] text-purple-100/60 sm:block">
          GRIMÓRIO DIGITAL
        </p>
      </nav>
    </header>
  );
}

export default AuthHeader;