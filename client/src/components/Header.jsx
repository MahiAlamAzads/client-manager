import AvatarImage from "../assets/avatar.svg";
import LogoImage from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* <!-- Logo & Title --> */}
          <a
            href="index.html"
            className="flex items-center gap-3 group shrink-0"
          >
            <img
              src={LogoImage}
              alt="Project Hub"
              className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105"
            />
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                Project<span className="text-blue-500 font-extrabold">Hub</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                Studio
              </span>
            </div>
          </a>

          {/* <!-- Right Side Actions --> */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* <!-- Modern User Profile Avatar --> */}
            <div className="flex items-center pl-2 border-l border-zinc-800">
              <img
                src={AvatarImage}
                alt="User Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-1 ring-zinc-700 hover:ring-blue-500/50 transition-all object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
