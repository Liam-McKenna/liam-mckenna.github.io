import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-accent-soft">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">
        Page not found
      </h1>
      <p className="mt-4 text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block font-mono text-sm text-accent-bright hover:underline"
      >
        &larr; Back home
      </Link>
    </div>
  );
}
