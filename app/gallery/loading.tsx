/**
 * Gallery route loading UI (Next.js App Router).
 *
 * The gallery renders 18 full-resolution photos, so the first paint can feel
 * slow on mobile connections. Next.js shows this skeleton instantly while the
 * route's server components + images stream in, then swaps it for the real
 * gallery. It mirrors the final grid (col counts + varying aspect ratios) so
 * there's no layout shift when the content arrives.
 */
export default function GalleryLoading() {
  // Same tile pattern the real grid uses: index % 5 -> tall, % 7 -> square.
  const tiles = Array.from({ length: 18 }, (_, i) => {
    const isTall = i % 5 === 0;
    const isWide = i % 7 === 0;
    let aspect = "aspect-[4/3]";
    if (isTall) aspect = "aspect-[3/4]";
    else if (isWide) aspect = "aspect-square";
    return aspect;
  });

  return (
    <div aria-busy="true" aria-live="polite" className="pb-16">
      <span className="sr-only">Loading gallery…</span>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-6 sm:px-6 sm:pt-16 text-center sm:text-left">
        <div className="mx-auto h-3 w-24 animate-pulse rounded-full bg-orange-200/70 sm:mx-0" />
        <div className="mt-3 h-9 w-3/4 max-w-md animate-pulse rounded-xl bg-gray-200 sm:h-11" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full max-w-2xl animate-pulse rounded-md bg-gray-100" />
          <div className="h-4 w-5/6 max-w-xl animate-pulse rounded-md bg-gray-100" />
        </div>
      </section>

      {/* Image grid skeleton */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tiles.map((aspect, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-3xl bg-gray-100 ${aspect}`}
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="h-14 w-72 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </section>
    </div>
  );
}
