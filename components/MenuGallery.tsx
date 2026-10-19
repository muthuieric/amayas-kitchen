"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** All menu screenshots in public/. */
const MENU_IMAGES = [
  "Screenshot from 2026-10-19 21-21-53.png",
  "Screenshot from 2026-10-19 21-40-59.png",
  "Screenshot from 2026-10-19 21-41-13.png",
  "Screenshot from 2026-10-19 21-43-46.png",
  "Screenshot from 2026-10-19 21-45-12.png",
  "Screenshot from 2026-10-19 21-45-24.png",
  "Screenshot from 2026-10-19 21-45-34.png",
  "Screenshot from 2026-10-19 21-45-44.png",
  "Screenshot from 2026-10-19 21-46-11.png",
  "Screenshot from 2026-10-19 21-46-26.png",
  "Screenshot from 2026-10-19 21-46-38.png",
  "Screenshot from 2026-10-19 21-50-27.png",
  "Screenshot from 2026-10-19 21-50-38.png",
  "Screenshot from 2026-10-19 21-51-29.png",
  "Screenshot from 2026-10-19 21-51-54.png",
  "Screenshot from 2026-10-19 21-52-15.png",
  "Screenshot from 2026-10-19 21-52-28.png",
  "Screenshot from 2026-10-19 21-52-39.png",
  "Screenshot from 2026-10-19 21-52-49.png",
  "Screenshot from 2026-10-19 21-53-00.png",
  "Screenshot from 2026-10-19 21-53-12.png",
  "Screenshot from 2026-10-19 21-53-21.png",
  "Screenshot from 2026-10-19 21-53-31.png",
  "Screenshot from 2026-10-19 21-53-53.png",
  "Screenshot from 2026-10-19 21-54-19.png",
] as const;

const srcOf = (src: string) => "/" + encodeURIComponent(src);

export function MenuGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fitToScreen, setFitToScreen] = useState(true);

  const openModal = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setImageLoaded(false);
      setFitToScreen(true);
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MENU_IMAGES.length);
    setImageLoaded(false);
    setFitToScreen(true);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MENU_IMAGES.length) % MENU_IMAGES.length);
    setImageLoaded(false);
    setFitToScreen(true);
  }, []);

  const currentSrc = MENU_IMAGES[currentIndex];

  // Keyboard navigation: ESC to close, arrow keys to browse
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, closeModal, prevImage, nextImage]);

  return (
    <>
      {/* Menu gallery */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Menu Photos
          </span>
          <h2 className="mt-1 font-display text-2xl font-black tracking-tight sm:text-3xl">
            See What We Serve
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap any photo to open it full screen and read the prices clearly.
          </p>
        </div>

        <div
          className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        >
          {MENU_IMAGES.map((src, i) => (
            <div
              key={src}
              onClick={() => openModal(i)}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card cursor-pointer min-h-[320px] sm:min-h-[360px]"
            >
              <Image
                src={srcOf(src)}
                alt={`Menu item ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                loading={i < 4 ? "eager" : "lazy"}
              />
              {/* Hover overlay: invites the visitor to enlarge */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur px-3.5 py-2 rounded-full text-sm font-semibold text-slate-900 shadow-lg border border-white/60">
                  <Search size={15} className="text-orange-600" />
                  <span>Enlarge</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-slate-500 truncate">
                  Menu Item {i + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {MENU_IMAGES.length} menu photos &nbsp;|&nbsp; tap any photo to view full screen
        </p>
      </section>

      {/* Full-screen lightbox modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-2 sm:p-4 lg:p-6"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Menu photo enlarged"
        >
          {/* Close button (top right) */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 rounded-full bg-black/60 p-2.5 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <X size={22} strokeWidth={2.5} />
          </button>

          {/* Fit / actual-size toggle (top left) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFitToScreen((f) => !f);
            }}
            className="absolute top-4 left-4 z-20 rounded-full bg-black/60 p-2.5 text-white hover:bg-white/20 transition-colors backdrop-blur-sm sm:hidden lg:flex"
            aria-label={fitToScreen ? "Actual size" : "Fit to screen"}
            title={fitToScreen ? "View actual size" : "Fit to screen"}
          >
            {fitToScreen ? (
              <Maximize size={20} strokeWidth={2.5} />
            ) : (
              <Minimize size={20} strokeWidth={2.5} />
            )}
          </button>

          {/* Image stage: fills the viewport as much as possible */}
          <div
            className="relative w-full h-full max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={srcOf(currentSrc)}
              alt={`Menu item ${currentIndex + 1} (full screen)`}
              fill
              className={cn(
                "object-contain bg-black",
                fitToScreen
                  ? "max-w-full max-h-full"
                  : "w-auto h-auto max-w-[95vw] max-h-[95vh]"
              )}
              sizes="100vw"
              priority
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Index + caption bar (bottom) */}
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-xs font-medium text-white/80 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto">
              {currentIndex + 1} / {MENU_IMAGES.length}
            </span>
            <p className="text-sm font-medium text-white bg-black/60 px-4 py-2 rounded-xl backdrop-blur-sm pointer-events-none">
              Menu Item {currentIndex + 1}
            </p>
          </div>

          {/* Navigation arrows (sides) */}
          <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none sm:px-8">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className={cn(
                "pointer-events-auto w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10",
                currentIndex === 0
                  ? "opacity-20 cursor-not-allowed"
                  : "cursor-pointer"
              )}
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className={cn(
                "pointer-events-auto w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10",
                currentIndex === MENU_IMAGES.length - 1
                  ? "opacity-20 cursor-not-allowed"
                  : "cursor-pointer"
              )}
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>

          <p className="absolute bottom-20 left-0 right-0 text-center text-[11px] uppercase tracking-wider text-white/50 pointer-events-none">
            arrow keys to browse &middot; esc to close
          </p>
        </div>
      )}
    </>
  );
}
