'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-800">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
          <p className="text-sm text-slate-600">
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
