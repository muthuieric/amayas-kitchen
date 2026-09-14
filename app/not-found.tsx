import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <span className="font-display text-6xl sm:text-7xl font-black text-red-700">404</span>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-600 active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
