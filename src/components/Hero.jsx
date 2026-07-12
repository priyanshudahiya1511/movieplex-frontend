import { Play, Info } from "lucide-react";

export default function Hero({ movie, onOpen }) {
  if (!movie) {
    return <div className="mb-12 h-[60vh] animate-pulse bg-card md:h-[80vh]" />;
  }

  return (
    <section
      className="relative mb-12 flex h-[60vh] items-center bg-cover bg-center px-5 md:h-[80vh] md:px-12"
      style={{
        backgroundImage: `linear-gradient(to top, #141414 0%, transparent 60%), url(${movie.poster})`,
      }}
    >
      <div className="max-w-xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{movie.title}</h1>
        <p className="mb-5 line-clamp-3 text-neutral-200 md:text-lg">
          {movie.description}
        </p>

        <div className="flex gap-3">
          {movie.trailer && (
            <button
              onClick={() => window.open(movie.trailer, "_blank")}
              className="flex items-center gap-2 rounded bg-white px-6 py-2 font-semibold text-black hover:bg-neutral-200"
            >
              <Play size={18} fill="black" /> Play trailer
            </button>
          )}

          <button
            onClick={() => onOpen(movie)}
            className="flex items-center gap-2 rounded bg-neutral-500/70 px-6 py-2 font-semibold hover:bg-neutral-600"
          >
            <Info size={18} /> More info
          </button>
        </div>
      </div>
    </section>
  );
}
