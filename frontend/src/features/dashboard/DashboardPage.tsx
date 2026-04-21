import { supabase } from "../../lib/supabase";

export function DashboardPage() {
  return (
    <main className="mx-auto mt-16 w-full max-w-3xl rounded-3xl border border-violet-100 bg-white/95 p-8 shadow-2xl shadow-violet-200/70">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight text-violet-700">
          Student Dashboard
        </h1>
        <button
          className="rounded-xl border border-violet-200 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </button>
      </div>
      <p className="text-lg font-semibold text-violet-500">
        MVP ready for upload and quiz generation flows.
      </p>
    </main>
  );
}
