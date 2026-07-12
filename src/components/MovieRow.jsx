import MovieCard from "./MovieCard.jsx";

export default function MovieRow({ title, movies, ...cardProps }) {
  if (!movies?.length) return null;

  return (
    <div className="mb-10">
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-3">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} {...cardProps} />
        ))}
      </div>
    </div>
  );
}
