"use client";
import * as React from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { BackButton } from "@/components/ui/back-button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Component as CTAButton } from "@/components/ui/button-cta";

type Meal = "breakfast" | "lunch" | "dinner";
type Lesson = { id: string; title: string; videoUrl: string };
type Ingredient = { id: string; name: string; amount?: string };
type Recipe = { id: string; title: string; description?: string; photo?: string; lessons: Lesson[]; createdAt: string; meal: Meal; ingredients?: Ingredient[] };

export default function BreakfastPage() {
  const [items, setItems] = React.useState<Recipe[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem("recipes");
      const data: Recipe[] = raw ? JSON.parse(raw) : [];
      setItems(data.filter((r) => r.meal === "breakfast"));
    } catch {
      setItems([]);
    }
  }, []);

  const list = items;

  const svgFor = React.useCallback((name: string) => {
    const hash = Array.from(name).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 0);
    const d1 = 8 + (Math.abs(hash) % 6);
    const d2 = d1 + 6;
    const bg1 = `hsl(226 20% ${18 + d1}%)`;
    const bg2 = `hsl(226 18% ${22 + d2}%)`;
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${bg1}' />
      <stop offset='100%' stop-color='${bg2}' />
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' rx='32' fill='url(#g)'/>
  <circle cx='256' cy='256' r='120' fill='rgba(255,255,255,0.12)'/>
  <text x='50%' y='54%' text-anchor='middle' dominant-baseline='middle'
        font-family='system-ui,-apple-system,Segoe UI,Roboto,Ubuntu' font-size='64'
        fill='rgba(255,255,255,0.92)' letter-spacing='2'>${initials}</text>
</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  const testimonials = React.useMemo(() => {
    const fromSaved = list.map((r) => ({
      quote: (r.ingredients && r.ingredients.length > 0
        ? r.ingredients.map(i => i.name).filter(Boolean).join(", ")
        : r.description || "Рецепт для завтрака."),
      name: r.title,
      designation: "Завтрак",
      src: r.photo || svgFor(r.title),
    }));
    const uniqueByName = fromSaved.filter(
      (v, i, a) => a.findIndex((x) => x.name === v.name) === i,
    );
    if (uniqueByName.length > 0) return uniqueByName;
    const fallback = [
      {
        quote: "Рецепт для завтрака.",
        name: "Запеченная овсянка - тирамису",
        designation: "Завтрак",
        src: svgFor("Запеченная овсянка - тирамису"),
      },
    ];
    return fallback;
  }, [list, svgFor]);

  return (
    <BeamsBackground showDemoText={false}>
      <BackButton />
      <div className="flex flex-col items-center gap-3 px-5 sm:px-6 text-center pt-14 sm:pt-16">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Завтрак
        </h1>
        <p className="max-w-[640px] text-xs sm:text-sm text-white/80">Выберите блюдо на завтрак.</p>
        {testimonials.length > 0 && (
          <AnimatedTestimonials
            testimonials={testimonials}
            className="py-4 w-full px-0"
            imageContainerClass="w-full h-56 sm:h-64 md:h-64 md:w-80"
            layoutClass="gap-6 md:grid-cols-[auto_1fr] items-start"
            onActiveChange={setActiveIndex}
          />
        )}
        <div className="mt-2 sm:mt-3">
          <CTAButton
            href="/plan/lunch"
            className="w-[280px] justify-center"
            onClick={() => {
              try {
                const selRaw = window.localStorage.getItem("planSelection");
                const sel = selRaw ? JSON.parse(selRaw) : {};
                const choice = items[activeIndex] || items[0];
                if (choice) {
                  const next = { ...sel, breakfast: choice.id };
                  window.localStorage.setItem("planSelection", JSON.stringify(next));
                }
              } catch {}
            }}
          >
            Выбрать этот завтрак
          </CTAButton>
        </div>
      </div>
    </BeamsBackground>
  );
}
