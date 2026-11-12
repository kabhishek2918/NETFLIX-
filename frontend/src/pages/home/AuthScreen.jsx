import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Clapperboard, Compass, Search, Star } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + encodeURIComponent(email));
  };

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_rgba(229,9,20,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-[#090909]/30 to-[#090909]" />
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
          <Link to="/" className="flex items-center gap-2" aria-label="Cineora home">
            <Clapperboard className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-black tracking-[0.12em]">CINEORA</span>
          </Link>
          <Link to="/login" className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold transition hover:bg-red-700">
            Sign in
          </Link>
        </header>

        <div className="mx-auto flex min-h-[620px] max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-16 text-center md:min-h-[680px]">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
            <Star className="h-3.5 w-3.5" /> Your entertainment compass
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Find your next
            <span className="block text-red-500">favourite story.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 md:text-xl">
            Explore movies and series, discover hidden gems, read reviews, and find out where to watch.
          </p>
          <form onSubmit={handleFormSubmit} className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-md border border-white/20 bg-black/60 px-4 py-3.5 text-white outline-none placeholder:text-zinc-500 focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3.5 font-bold transition hover:bg-red-700">
              Get started <ArrowRight className="h-5 w-5" />
            </button>
          </form>
          <p className="mt-4 text-sm text-zinc-500">Create a free account to build your personal watchlist.</p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#101010] px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-7">
            <Search className="mb-5 h-8 w-8 text-red-500" />
            <h2 className="text-xl font-bold">Discover more</h2>
            <p className="mt-3 leading-7 text-zinc-400">Explore popular titles, genres, and recommendations to find something worth watching.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-7">
            <Compass className="mb-5 h-8 w-8 text-red-500" />
            <h2 className="text-xl font-bold">Know where to watch</h2>
            <p className="mt-3 leading-7 text-zinc-400">Find official availability information and links to authorised streaming services.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-7">
            <Star className="mb-5 h-8 w-8 text-red-500" />
            <h2 className="text-xl font-bold">Make it yours</h2>
            <p className="mt-3 leading-7 text-zinc-400">Keep a personal watchlist and explore entertainment picked around your interests.</p>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Cineora. Discover your next favourite story.
      </footer>
    </main>
  );
};

export default AuthScreen;
