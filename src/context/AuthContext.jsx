import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants.js";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // TMDB ids

  // If there's no token, there's nothing to restore — don't start in a loading state
  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem("movieplex-token")),
  );

  // On boot, if there's a saved token, ask the API who it belongs to
  useEffect(() => {
    const token = localStorage.getItem("movieplex-token");
    if (!token) return;

    axios
      .get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setUser(data);
        setFavorites(data.favorites || []);
      })
      .catch(() => localStorage.removeItem("movieplex-token")) // expired or invalid
      .finally(() => setLoading(false));
  }, []);

  const save = ({ user, token }) => {
    localStorage.setItem("movieplex-token", token);
    setUser(user);
    setFavorites(user.favorites || []);
  };

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    save(data);
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    save(data);
  };

  const logout = () => {
    localStorage.removeItem("movieplex-token");
    setUser(null);
    setFavorites([]);
  };

  // Returns true if the movie ended up favorited
  const toggleFavorite = async (movieId) => {
    const token = localStorage.getItem("movieplex-token");

    const { data } = await axios.post(
      `${API_URL}/favorites/${movieId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setFavorites(data.favorites);
    return data.favorite;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        loading,
        login,
        register,
        logout,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
