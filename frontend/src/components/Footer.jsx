const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#090909] px-5 py-8 text-center text-sm text-zinc-500">
      <p>© {new Date().getFullYear()} Cineora. Discover your next favourite story.</p>
      <p className="mt-2">Movie information and availability are provided for discovery purposes.</p>
    </footer>
  );
};

export default Footer;
