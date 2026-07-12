import { useEffect, useState } from "react";
import { Film, Search, User } from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ onCategory, onOpenMovie, onOpenAuth }) {
  const { user, logout } = useAuth();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Wait for a pause in typing, then search. The cleanup cancels the pending
  // timer on every keystroke, so only the last one actually fires.
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      axios
        .get(`${API_URL}/movies/search/${encodeURIComponent(query)}`)
        .then(({ data }) => setResults(data.slice(0, 6)))
        .catch(() => setResults([]));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <header className="fixed top-0 z-40 w-full bg-base/95 px-4 py-4 md:px-12">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => onCategory("All")}
          className="flex shrink-0 items-center gap-2 text-brand"
        >
          <Film size={26} />
          {/* the wordmark would crowd the search box on a phone */}
          <span className="hidden text-xl font-bold sm:inline">MOVIEPLEX</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex w-36 items-center gap-2 rounded border border-white/40 bg-black/60 px-3 py-1.5 sm:w-52 md:w-64">
              <Search size={16} className="shrink-0 text-neutral-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies"
                className="w-full min-w-0 bg-transparent text-sm outline-none"
              />
            </div>

            {results.length > 0 && (
              <div className="absolute right-0 top-full mt-2 max-h-96 w-64 overflow-y-auto rounded bg-black/95 shadow-2xl sm:w-full">
                {results.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      onOpenMovie(m);
                      setQuery("");
                      setResults([]);
                    }}
                    className="block w-full px-4 py-2.5 text-left text-sm hover:bg-white/10"
                  >
                    {m.title}
                    <span className="ml-2 text-xs text-muted">
                      {m.year || "—"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Account"
              className="flex h-8 w-8 items-center justify-center rounded bg-brand"
            >
              <User size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded bg-neutral-900 shadow-2xl">
                <div className="border-b border-white/10 px-4 py-3">
                  <div className="truncate text-sm font-semibold">
                    {user ? user.name : "Guest"}
                  </div>
                  <div className="truncate text-xs text-muted">
                    {user ? user.email : "Not signed in"}
                  </div>
                </div>

                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      onCategory("All");
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/10"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAuth();
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/10"
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
