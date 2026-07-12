import { Shuffle } from "lucide-react";

export default function Recommended({ movie, onShuffle, onOpen }) {
  if (!movie) return null;

  return (
    <section className="mb-12 px-5 md:px-12">
      <h2 className="mb-4 text-xl font-semibold">Recommended for you</h2>

      <div
        onClick={() => onOpen(movie)}
        className="flex cursor-pointer flex-col items-center gap-6 rounded-lg bg-card p-5 text-center md:flex-row md:text-left"
      >
        <div className="flex-1">
          <h3 className="mb-2 text-2xl font-semibold">{movie.title}</h3>
          <p className="line-clamp-3 text-muted">{movie.description}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShuffle();
            }}
            className="mt-4 inline-flex items-center gap-2 rounded bg-brand px-5 py-2.5 text-sm font-semibold hover:bg-brand-dark"
          >
            <Shuffle size={15} /> Show another
          </button>
        </div>

        {movie.poster && (
          <img src={movie.poster} alt={movie.title} className="w-40 rounded shadow-2xl" />
        )}
      </div>
    </section>
  );
}
