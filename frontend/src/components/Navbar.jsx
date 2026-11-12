import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard, LogOut, Menu, Search, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="relative z-50 mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 py-4 text-white md:px-8">
      <div className="flex items-center gap-8">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <Clapperboard className="h-7 w-7 text-red-500" />
          <span className="text-xl font-black tracking-[0.12em] sm:text-2xl">CINEORA</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium sm:flex">
          <Link to="/" className="transition hover:text-red-400" onClick={() => setContentType("movie")}>Movies</Link>
          <Link to="/" className="transition hover:text-red-400" onClick={() => setContentType("tv")}>TV Shows</Link>
          <Link to="/history" className="transition hover:text-red-400">Search History</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/search" aria-label="Search movies" className="transition hover:text-red-400">
          <Search className="h-6 w-6" />
        </Link>
        {user?.image && <img src={user.image} alt="Your profile" className="h-8 w-8 rounded-full object-cover" />}
        <button type="button" onClick={logout} aria-label="Log out" className="transition hover:text-red-400">
          <LogOut className="h-6 w-6" />
        </button>
        <button type="button" className="sm:hidden" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="absolute left-4 right-4 top-[calc(100%-4px)] rounded-lg border border-white/10 bg-[#111] p-3 shadow-xl sm:hidden">
          <Link to="/" className="block rounded px-3 py-3 hover:bg-white/5" onClick={() => { setContentType("movie"); closeMenu(); }}>Movies</Link>
          <Link to="/" className="block rounded px-3 py-3 hover:bg-white/5" onClick={() => { setContentType("tv"); closeMenu(); }}>TV Shows</Link>
          <Link to="/history" className="block rounded px-3 py-3 hover:bg-white/5" onClick={closeMenu}>Search History</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
