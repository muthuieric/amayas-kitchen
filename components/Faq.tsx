"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import siteContent from "@/data/site-content.json";

const { faqs } = siteContent;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50/80 py-12 sm:py-16 md:py-20 border-t border-gray-200/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">
          Questions?
        </span>
        <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs">
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
                className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left transition-colors hover:bg-gray-50/50"
              >
                <span className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-orange-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
