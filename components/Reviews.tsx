import { Star } from "lucide-react";
import siteContent from "@/data/site-content.json";

const { reviews } = siteContent;

export function Reviews() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">
          Testimonials
        </span>
        <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          What Our Customers Say
        </h2>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-display text-sm sm:text-base font-bold text-slate-900">{review.name}</p>
                  <div className="flex gap-0.5 text-orange-500 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{`"${review.review}"`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
