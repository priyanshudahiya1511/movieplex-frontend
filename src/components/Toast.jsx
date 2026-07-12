export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 rounded bg-brand px-5 py-3 text-sm shadow-xl">
      {message}
    </div>
  );
}
