"use client";
import * as React from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { BackButton } from "@/components/ui/back-button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

type Meal = "breakfast" | "lunch" | "dinner";
type Lesson = { id: string; title: string; videoUrl: string };
type Recipe = { id: string; title: string; description?: string; photo?: string; lessons: Lesson[]; createdAt: string; meal: Meal };

export default function LunchPage() {
  const [items, setItems] = React.useState<Recipe[]>([]);
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem("recipes");
      const data: Recipe[] = raw ? JSON.parse(raw) : [];
      setItems(data.filter((r) => r.meal === "lunch"));
    } catch {
      setItems([]);
    }
  }, []);

  return (
    <BeamsBackground showDemoText={false}>
      <BackButton />
      <div className="flex flex-col items-center gap-3 px-4 sm:px-6 text-center pt-24 sm:pt-28">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Обед
        </h1>
        <p className="max-w-[640px] text-sm sm:text-base text-white/80">
          Выберите блюда для обеда.
        </p>
        {items.length > 0 && (
          <AnimatedTestimonials
            testimonials={items.map((r) => ({
              quote: r.description || "Рецепт для обеда.",
              name: r.title,
              designation: "Обед",
              src: r.photo || `data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' rx='32' fill='hsl(226 18% 28%)'/><text x='50%' y='54%' text-anchor='middle' dominant-baseline='middle' font-family='system-ui,-apple-system,Segoe UI,Roboto,Ubuntu' font-size='64' fill='rgba(255,255,255,0.92)' letter-spacing='2'>${r.title.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase()}</text></svg>`
              )}`,
            }))}
            className="py-6"
          />
        )}
        <div className="mt-6 w-full max-w-2xl grid gap-3">
          {items.length === 0 && <p className="text-white/60">Пока нет рецептов</p>}
          {items.map((r) => (
            <div key={r.id} className="rounded-md border border-white/10 p-4">
              <p className="text-white font-semibold">{r.title}</p>
              <p className="text-white/70 text-sm mt-1">{r.description}</p>
              <p className="text-white/70 text-xs mt-1">Уроков: {r.lessons.length}</p>
            </div>
          ))}
        </div>
      </div>
    </BeamsBackground>
  );
}
