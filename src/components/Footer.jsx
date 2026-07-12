export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 px-5 py-8 md:px-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-2xl font-bold text-brand">MOVIEPLEX</div>
        <p className="text-sm text-muted">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
        <p className="text-sm text-muted">© 2026 MoviePlex</p>
      </div>
    </footer>
  );
}
