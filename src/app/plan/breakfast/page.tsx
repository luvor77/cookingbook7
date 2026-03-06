"use client";
import * as React from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { BackButton } from "@/components/ui/back-button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

type Meal = "breakfast" | "lunch" | "dinner";
type Lesson = { id: string; title: string; videoUrl: string };
type Recipe = { id: string; title: string; description?: string; photo?: string; lessons: Lesson[]; createdAt: string; meal: Meal };

export default function BreakfastPage() {
  const [items, setItems] = React.useState<Recipe[]>([]);
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
      quote: r.description || "Рецепт для завтрака.",
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
      <div className="flex flex-col items-center gap-3 px-4 sm:px-6 text-center pt-12 sm:pt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Завтрак
        </h1>
        <p className="max-w-[640px] text-sm sm:text-base text-white/80">Выберите блюдо на завтрак.</p>
        {testimonials.length > 0 && (
          <AnimatedTestimonials
            testimonials={testimonials}
            className="py-4 max-w-6xl w-full"
            imageContainerClass="h-48 w-56 md:h-64 md:w-80"
            layoutClass="grid grid-cols-[auto_1fr] gap-8 items-start"
          />
        )}
      </div>
    </BeamsBackground>
  );
}
