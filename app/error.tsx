'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
        <p className="text-sm text-slate-600">
          We encountered an issue loading this page. Please try refreshing.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
