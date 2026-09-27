import logoImage from "../assets/logo.svg";
const Footer = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#09090b] py-5 text-center text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            src={logoImage}
            alt="Project Hub"
            className="w-4 h-4 opacity-70"
          />
          <span className="font-medium text-zinc-400">
            Batch 5 — Project Hub
          </span>
        </div>
        <p>Copyright ©2026 Learn with Sumit • All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
