import { MenuSection } from "@/components/MenuSection";

export const metadata = {
  title: "Menu - Amaya's Swahili Kitchen",
  description:
    "Browse Amaya's full Swahili menu: pilau, biryani, mbuzi wet fry, samaki wa kupaka, mshikaki, chapati and more.",
  openGraph: {
    title: "Menu - Amaya's Swahili Kitchen",
    description: "Browse Amaya's full Swahili menu and order via WhatsApp.",
  },
};

export default function MenuPage() {
  return (
    <div className="pt-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent">The Menu</span>
        <h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">
          Every dish, made fresh
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Tap any dish to add it to your cart, then check out on WhatsApp for delivery to your
          location.
        </p>
      </div>
      <MenuSection />
    </div>
  );
}
