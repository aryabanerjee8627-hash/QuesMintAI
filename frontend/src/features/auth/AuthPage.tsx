import { FormEvent, useState } from "react";
import { supabase } from "../../lib/supabase";

export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    const { data, error: authError } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setSubmitting(false);
    if (authError) {
      setError(authError.message);
      return;
    }

    if (mode === "signup") {
      if (!data.session) {
        setInfo("Account created. Check your email to verify, then sign in.");
      } else {
        setInfo("Account created and signed in.");
      }
    }
  }

  return (
    <main className="mx-auto mt-16 w-full max-w-md rounded-3xl border border-violet-100 bg-white/95 p-8 shadow-2xl shadow-violet-200/70">
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-violet-700">
        QuesMint
      </h1>
      <p className="mb-8 text-base font-semibold text-violet-500">
        AI quizzes crafted with precision
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full rounded-xl border border-violet-200 px-4 py-3 text-base font-semibold text-violet-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded-xl border border-violet-200 px-4 py-3 text-base font-semibold text-violet-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full rounded-xl bg-violet-700 px-4 py-3 text-lg font-extrabold text-white transition hover:bg-violet-800 disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>
      {info && <p className="mt-3 text-sm font-semibold text-violet-600">{info}</p>}
      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <button
        className="mt-5 text-sm font-bold text-violet-600 underline"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin"
          ? "Need an account? Sign up"
          : "Already have an account? Sign in"}
      </button>
    </main>
  );
}
