import { useState } from "react";
import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  };

  return (
    <main className="min-h-screen w-full bg-[#090909] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <Clapperboard className="h-8 w-8 text-red-500" />
          <span className="text-2xl font-black tracking-[0.12em]">CINEORA</span>
        </Link>
      </header>
      <div className="flex justify-center px-4 pb-16 pt-12">
        <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
          <h1 className="mb-2 text-center text-3xl font-bold">Create your account</h1>
          <p className="mb-7 text-center text-sm text-zinc-400">Join Cineora and start exploring.</p>
          <form className="space-y-5" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">Email</label>
              <input type="email" required autoComplete="email" className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-3 text-white outline-none focus:border-red-500" placeholder="you@example.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-300">Username</label>
              <input type="text" required autoComplete="username" className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-3 text-white outline-none focus:border-red-500" placeholder="Choose a username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">Password</label>
              <input type="password" required autoComplete="new-password" className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-3 text-white outline-none focus:border-red-500" placeholder="Create a password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="w-full rounded-md bg-red-600 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-60" disabled={isSigningUp}>
              {isSigningUp ? "Creating account..." : "Create account"}
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-zinc-400">Already have an account? <Link to="/login" className="font-semibold text-red-400 hover:underline">Sign in</Link></p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
