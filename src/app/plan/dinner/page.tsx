"use client";
import * as React from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { BackButton } from "@/components/ui/back-button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Component as CTAButton } from "@/components/ui/button-cta";
// no router import needed here

type Meal = "breakfast" | "lunch" | "dinner";
type Lesson = { id: string; title: string; videoUrl: string };
type Ingredient = { id: string; name: string; amount?: string };
type Recipe = { id: string; title: string; description?: string; photo?: string; lessons: Lesson[]; createdAt: string; meal: Meal; ingredients?: Ingredient[] };

export default function DinnerPage() {
  const [items, setItems] = React.useState<Recipe[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem("recipes");
      const data: Recipe[] = raw ? JSON.parse(raw) : [];
      setItems(data.filter((r) => r.meal === "dinner"));
    } catch {
      setItems([]);
    }
  }, []);

  return (
    <BeamsBackground showDemoText={false}>
      <BackButton />
      <div className="flex flex-col items-center gap-3 px-4 sm:px-6 text-center pt-3 sm:pt-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Ужин
        </h1>
        <p className="max-w-[640px] text-sm sm:text-base text-white/80">
          Выберите блюда для ужина.
        </p>
        {items.length > 0 && (
          <AnimatedTestimonials
            testimonials={items.map((r) => ({
              quote: (r.ingredients && r.ingredients.length > 0
                ? r.ingredients.map(i => i.name).filter(Boolean).join(", ")
                : r.description || "Рецепт для ужина."),
              name: r.title,
              designation: "Ужин",
              src: r.photo || `data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' rx='32' fill='hsl(226 18% 28%)'/><text x='50%' y='54%' text-anchor='middle' dominant-baseline='middle' font-family='system-ui,-apple-system,Segoe UI,Roboto,Ubuntu' font-size='64' fill='rgba(255,255,255,0.92)' letter-spacing='2'>${r.title.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase()}</text></svg>`
              )}`,
            }))}
            className="py-4 w-full"
            imageContainerClass="w-full h-56 sm:h-64 md:h-64 md:w-80"
            layoutClass="gap-6 md:grid-cols-[auto_1fr] items-start"
            onActiveChange={setActiveIndex}
          />
        )}
        <div className="mt-6 w-full max-w-2xl grid gap-3">
          {items.length === 0 && <p className="text-white/60">Пока нет рецептов</p>}
          {items.map((r) => {
            const comp = r.ingredients && r.ingredients.length > 0 ? r.ingredients.map(i => i.name).filter(Boolean).join(", ") : r.description;
            return (
              <div key={r.id} className="rounded-md border border-white/10 p-4">
                <p className="text-white font-semibold">{r.title}</p>
                {comp && <p className="text-white/70 text-sm mt-1">{comp}</p>}
                <p className="text-white/70 text-xs mt-1">Уроков: {r.lessons.length}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed z-20 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6" style={{ bottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))" }}>
        <div className="flex justify-center">
          <CTAButton
            href="/plan/summary"
            className="w-[280px] justify-center"
            onClick={() => {
              try {
                const selRaw = window.localStorage.getItem("planSelection");
                const sel = selRaw ? JSON.parse(selRaw) : {};
                const choice = items[activeIndex] || items[0];
                if (choice) {
                  const next = { ...sel, dinner: choice.id };
                  window.localStorage.setItem("planSelection", JSON.stringify(next));
                }
              } catch {}
            }}
          >
            Выбрать этот ужин
          </CTAButton>
        </div>
      </div>
    </BeamsBackground>
  );
}
