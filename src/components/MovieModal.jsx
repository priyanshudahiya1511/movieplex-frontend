import { useEffect, useState } from "react";
import { X, PlayCircle } from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants.js";

const LINKS = {
  YouTube: "https://www.youtube.com",
  Tubi: "https://tubitv.com",
  "Pluto TV": "https://pluto.tv",
  Freevee: "https://www.amazon.com/adlp/freevee",
  Kanopy: "https://kanopy.com",
};

export default function MovieModal({ movie, onClose }) {
  // List routes ship no trailer (it's an extra TMDB call per movie), so fetch
  // the full record on open. Until it lands, fall back to the movie we were given.
  const [details, setDetails] = useState(null);
  const full = details?.id === movie.id ? details : movie;

  useEffect(() => {
    if (movie.trailer) return;

    let cancelled = false;

    axios
      .get(`${API_URL}/movies/${movie.id}`)
      .then(({ data }) => !cancelled && setDetails(data))
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [movie.id, movie.trailer]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-panel p-6 md:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-card hover:bg-brand"
        >
          <X size={18} />
        </button>

        <div className="mb-6 flex flex-col gap-5 md:flex-row">
          {full.poster && (
            <img
              src={full.poster}
              alt={full.title}
              className="mx-auto w-48 rounded md:mx-0"
            />
          )}

          <div className="flex-1">
            <h2 className="mb-2 pr-10 text-3xl font-bold">{full.title}</h2>
            <div className="mb-4 flex gap-4 text-sm text-muted">
              <span>{full.year || "—"}</span>
              <span className="font-semibold text-brand">★ {full.rating}</span>
            </div>
            <p className="leading-relaxed text-neutral-200">
              {full.description}
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 rounded bg-base p-10 text-center">
          <PlayCircle size={46} className="text-brand" />

          {full.trailer ? (
            <button
              onClick={() => window.open(full.trailer, "_blank")}
              className="rounded bg-brand px-4 py-2 text-sm font-semibold hover:bg-brand-dark"
            >
              Watch trailer
            </button>
          ) : (
            <p className="text-muted">No trailer available for this one.</p>
          )}
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Free platforms</h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {(full.platforms || []).map((p) => (
              <button
                key={p}
                onClick={() => window.open(LINKS[p], "_blank")}
                className="rounded bg-card p-4 text-center text-sm hover:bg-brand"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
