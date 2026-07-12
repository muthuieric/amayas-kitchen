import Image from "next/image";
import { Star } from "lucide-react";
import siteContent from "@/data/site-content.json";

const { reviews } = siteContent;

export function Reviews() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">
          Testimonials
        </span>
        <h2 className="mt-2 font-black tracking-tight text-slate-900 sm:text-4xl">
          What Our Customers Say
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center gap-3">
             
                <div>
                  <p className="font-bold text-slate-900">{review.name}</p>
                  <div className="flex gap-0.5 text-orange-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{`"${review.review}"`}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}