import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./constants.js";
import { useAuth } from "./context/AuthContext.jsx";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Recommended from "./components/Recommended.jsx";
import MovieRow from "./components/MovieRow.jsx";
import Platforms from "./components/Platforms.jsx";
import MovieModal from "./components/MovieModal.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Toast from "./components/Toast.jsx";
import Footer from "./components/Footer.jsx";

const CATEGORIES = ["Bollywood", "Hollywood", "Korean", "Tollywood"];

export default function App() {
  const { user, favorites } = useAuth();

  const [featured, setFeatured] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState("All");

  const [selected, setSelected] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Hero and recommendation load once
  useEffect(() => {
    axios
      .get(`${API_URL}/movies/featured`)
      .then(({ data }) => setFeatured(data));
    axios
      .get(`${API_URL}/movies/random`)
      .then(({ data }) => setRecommended(data));
  }, []);

  // Rows reload when the category changes, or when favorites change
  useEffect(() => {
    const load = async () => {
      if (category === "My Favorites") {
        if (!user) return setRows([]);

        const token = localStorage.getItem("movieplex-token");
        const { data } = await axios.get(`${API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return setRows([{ title: "My favorites", movies: data }]);
      }

      const wanted = category === "All" ? CATEGORIES : [category];

      const loaded = await Promise.all(
        wanted.map(async (c) => {
          const { data } = await axios.get(`${API_URL}/movies/category/${c}`);
          return { title: c, movies: data };
        }),
      );

      setRows(loaded);
    };

    load();
  }, [category, user, favorites]);

  const shuffle = () =>
    axios
      .get(`${API_URL}/movies/random`)
      .then(({ data }) => setRecommended(data));

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const cardProps = {
    onOpen: setSelected,
    onNeedsLogin: () => setAuthOpen(true),
    onToast: showToast,
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header
        onCategory={setCategory}
        onOpenMovie={setSelected}
        onOpenAuth={() => setAuthOpen(true)}
      />

      <Hero movie={featured} onOpen={setSelected} />

      <Recommended
        movie={recommended}
        onShuffle={shuffle}
        onOpen={setSelected}
      />

      <section className="mb-12 px-5 md:px-12">
        <h2 className="mb-4 text-xl font-semibold">Browse categories</h2>

        <div className="mb-6 flex flex-wrap gap-2">
          {["All", ...CATEGORIES, "My Favorites"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded px-4 py-2 text-sm ${c === category ? "bg-brand" : "bg-card"}`}
            >
              {c === "My Favorites" ? "♥ My favorites" : c}
            </button>
          ))}
        </div>

        {category === "My Favorites" && !user ? (
          <div className="rounded-lg bg-card px-5 py-16 text-center">
            <h3 className="mb-2 text-2xl font-semibold">
              Sign in to see your list
            </h3>
            <p className="mb-5 text-muted">
              Your favorites are saved to your account.
            </p>
            <button
              onClick={() => setAuthOpen(true)}
              className="rounded bg-brand px-5 py-2.5 font-semibold hover:bg-brand-dark"
            >
              Sign in
            </button>
          </div>
        ) : category === "My Favorites" && rows[0]?.movies.length === 0 ? (
          <div className="rounded-lg bg-card px-5 py-16 text-center">
            <h3 className="mb-2 text-2xl font-semibold">No favorites yet</h3>
            <p className="text-muted">
              Tap the heart on any movie to save it here.
            </p>
          </div>
        ) : (
          rows.map((row) => (
            <MovieRow key={row.title} {...row} {...cardProps} />
          ))
        )}
      </section>

      <Platforms />
      <Footer />

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
      {authOpen && (
        <AuthModal onClose={() => setAuthOpen(false)} onToast={showToast} />
      )}
      <Toast message={toast} />
    </div>
  );
}
