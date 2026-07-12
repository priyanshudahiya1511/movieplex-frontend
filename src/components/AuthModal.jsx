import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthModal({ onClose, onToast }) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError("");
    setBusy(true);

    try {
      if (mode === "signin") {
        await login(email, password);
        onToast("Signed in");
      } else {
        await register(name, email, password);
        onToast(`Welcome, ${name}`);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "w-full rounded border border-neutral-700 bg-neutral-800 px-3 py-3 text-sm outline-none focus:border-brand";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-lg bg-panel p-8"
      >
        <button onClick={onClose} className="absolute right-4 top-3 text-2xl">
          ×
        </button>

        <h2 className="mb-6 text-center text-2xl font-semibold">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h2>

        <div className="space-y-4">
          {mode === "signup" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className={field}
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className={field}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Password"
            className={field}
          />
        </div>

        {error && <p className="mt-3 text-sm text-brand">{error}</p>}

        <button
          onClick={submit}
          disabled={busy}
          className="mt-6 w-full rounded bg-brand py-3 font-semibold hover:bg-brand-dark disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <p className="mt-5 text-center text-sm text-muted">
          {mode === "signin" ? "New here? " : "Already have an account? "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-brand"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
