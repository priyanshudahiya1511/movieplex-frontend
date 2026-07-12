import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const FALLBACK = "https://placehold.co/500x750/242424/b3b3b3?text=No+Poster";

export default function MovieCard({ movie, onOpen, onNeedsLogin, onToast }) {
  const { user, favorites, toggleFavorite } = useAuth();

  // The API may hand back bare ids or whole movie objects, and Mongo can turn
  // numbers into strings — so compare loosely rather than with includes().
  const isFavorite = favorites.some(
    (f) => Number(f?.id ?? f) === Number(movie.id),
  );

  const handleFavorite = async (e) => {
    e.stopPropagation(); // don't open the modal

    if (!user) {
      onToast("Sign in to save favorites");
      onNeedsLogin();
      return;
    }

    const added = await toggleFavorite(movie.id);
    onToast(added ? `Added "${movie.title}"` : `Removed "${movie.title}"`);
  };

  return (
    <div
      onClick={() => onOpen(movie)}
      className="relative w-48 shrink-0 cursor-pointer overflow-hidden rounded bg-card transition-transform duration-300 hover:scale-105"
    >
      <button
        onClick={handleFavorite}
        aria-label="Toggle favorite"
        className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 hover:scale-110"
      >
        <Heart
          size={17}
          className={isFavorite ? "text-brand" : "text-white"}
          fill={isFavorite ? "#e50914" : "transparent"}
        />
      </button>

      <img
        src={movie.poster || FALLBACK}
        alt={movie.title}
        onError={(e) => (e.currentTarget.src = FALLBACK)}
        className="h-72 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="mb-1 truncate font-semibold">{movie.title}</h3>
        <div className="flex justify-between text-sm text-muted">
          <span>{movie.year || "—"}</span>
          <span className="font-semibold text-brand">★ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
}
