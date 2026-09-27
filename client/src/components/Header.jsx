import { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LogoImage from "../assets/logo.svg";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Restore user session from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("google_token");
    if (!savedToken) return;

    try {
      const decoded = jwtDecode(savedToken);

      // Verify token hasn't expired (exp is in seconds)
      if (decoded.exp * 1000 > Date.now()) {
        setUser({
          googleId: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        });
      } else {
        localStorage.removeItem("google_token");
      }
    } catch (error) {
      console.error("Invalid stored token:", error);
      localStorage.removeItem("google_token");
    }
  }, []);

  // Decode token on successful sign-in
  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        console.error("Token has expired");
        return;
      }

      setUser({
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      });

      // Save token for persistent login and future backend requests
      localStorage.setItem("google_token", token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("google_token");
    setUser(null);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Authenticated: Display decoded Google picture and profile dropdown */
              <div className="relative flex items-center pl-2 border-l border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 focus:outline-none group"
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-1 ring-zinc-700 group-hover:ring-blue-500/50 transition-all object-cover cursor-pointer"
                  />
                  <span className="hidden md:inline-block text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {user.name?.split(" ")[0]}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-60 py-2 bg-[#0e0e11] border border-zinc-800 rounded-xl shadow-xl shadow-black/60 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-zinc-800/70">
                      <p className="text-xs font-semibold text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <a
                        href="#profile"
                        className="flex items-center px-4 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-colors"
                      >
                        Profile Settings
                      </a>
                    </div>

                    <div className="pt-1 border-t border-zinc-800/70">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-1.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Unauthenticated: Google Sign In Button */
              <div className="flex items-center pl-2 border-l border-zinc-800">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.error("Google Sign-In failed")}
                  theme="filled_black"
                  shape="pill"
                  size="medium"
                  text="signin_with"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
