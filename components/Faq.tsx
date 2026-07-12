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
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-700">
          Questions?
        </span>
        <h2 className="mt-2 font-black tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-base font-bold text-slate-900">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-orange-500 transition-transform ${
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
                  <p className="px-5 pb-5 text-sm text-slate-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}