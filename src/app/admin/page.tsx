"use client";
import * as React from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { BackButton } from "@/components/ui/back-button";
import { useRouter } from "next/navigation";

type Lesson = { id: string; title: string; videoUrl: string };
type Meal = "breakfast" | "lunch" | "dinner";
type Recipe = { id: string; title: string; description?: string; photo?: string; lessons: Lesson[]; createdAt: string; meal: Meal };

const STORAGE_KEY = "recipes";

function loadRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
  } catch {
    return [];
  }
}

function saveRecipes(data: Recipe[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function AdminPage() {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [photoDataUrl, setPhotoDataUrl] = React.useState<string | undefined>();
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [list, setList] = React.useState<Recipe[]>([]);
  const [saved, setSaved] = React.useState(false);
  const [meal, setMeal] = React.useState<Meal>("breakfast");

  React.useEffect(() => {
    setList(loadRecipes());
  }, []);

  const addLesson = React.useCallback(() => {
    setLessons((p) => [...p, { id: crypto.randomUUID(), title: "", videoUrl: "" }]);
  }, []);

  const updateLesson = React.useCallback((id: string, patch: Partial<Lesson>) => {
    setLessons((p) => p.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }, []);

  const removeLesson = React.useCallback((id: string) => {
    setLessons((p) => p.filter((l) => l.id !== id));
  }, []);

  const onSave = React.useCallback(() => {
    if (!title.trim()) return;
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      photo: photoDataUrl,
      lessons: lessons
        .filter((l) => l.title.trim() && l.videoUrl.trim())
        .map((l) => ({ ...l, title: l.title.trim(), videoUrl: l.videoUrl.trim() })),
      createdAt: new Date().toISOString(),
      meal,
    };
    const next = [...list, recipe];
    saveRecipes(next);
    setList(next);
    setTitle("");
    setDescription("");
    setLessons([]);
    setPhotoDataUrl(undefined);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    router.push(`/plan/${meal}`);
  }, [title, description, lessons, list, meal, router, photoDataUrl]);

  const onDelete = React.useCallback((id: string) => {
    const next = list.filter((r) => r.id !== id);
    saveRecipes(next);
    setList(next);
  }, [list]);

  return (
    <BeamsBackground showDemoText={false}>
      <BackButton />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 pt-24 sm:pt-28">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-center">
          Админ‑панель
        </h1>
        <p className="text-white/80 text-center mt-2">Добавьте рецепт и прикрепите видеоуроки</p>

        <div className="mt-8 grid gap-4">
          <div className="grid gap-2">
            <select
              value={meal}
              onChange={(e) => setMeal(e.target.value as Meal)}
              className="w-full rounded-md bg-white/10 text-white px-4 py-3 outline-none focus:ring-2 ring-white/30"
            >
              <option value="breakfast">Завтрак</option>
              <option value="lunch">Обед</option>
              <option value="dinner">Ужин</option>
            </select>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название рецепта"
            className="w-full rounded-md bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-white/30"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание рецепта"
            rows={4}
            className="w-full rounded-md bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-white/30"
          />
          <div className="grid gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const res = reader.result as string;
                  setPhotoDataUrl(res);
                };
                reader.readAsDataURL(file);
              }}
              className="w-full rounded-md bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-white/30"
            />
            {photoDataUrl && (
              <img
                src={photoDataUrl}
                alt="Предпросмотр"
                className="h-32 w-32 object-cover rounded-md border border-white/10"
              />
            )}
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Уроки</h2>
              <button
                onClick={addLesson}
                className="rounded-md bg-white/10 text-white px-3 py-2 hover:bg-white/15 transition"
              >
                Добавить урок
              </button>
            </div>
            <div className="grid gap-3">
              {lessons.map((l) => (
                <div key={l.id} className="grid gap-2 rounded-md border border-white/10 p-3">
                  <input
                    value={l.title}
                    onChange={(e) => updateLesson(l.id, { title: e.target.value })}
                    placeholder="Название урока"
                    className="w-full rounded-md bg-white/10 text-white placeholder-white/60 px-3 py-2 outline-none focus:ring-2 ring-white/30"
                  />
                  <input
                    value={l.videoUrl}
                    onChange={(e) => updateLesson(l.id, { videoUrl: e.target.value })}
                    placeholder="Ссылка на видео (YouTube/Vimeo/файл)"
                    className="w-full rounded-md bg-white/10 text-white placeholder-white/60 px-3 py-2 outline-none focus:ring-2 ring-white/30"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeLesson(l.id)}
                      className="rounded-md bg-white/10 text-white px-3 py-2 hover:bg-white/15 transition"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={onSave}
              className="group relative inline-flex items-center justify-center text-base rounded-md bg-gray-900 px-8 py-2 text-lg font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30 w-[260px]"
            >
              Сохранить рецепт
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white mb-3">Сохранённые рецепты</h2>
          <div className="grid gap-3">
            {list.length === 0 && <p className="text-white/60">Список пуст</p>}
            {list.map((r) => (
              <div key={r.id} className="rounded-md border border-white/10 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold">{r.title}</p>
                    <p className="text-white/70 text-sm mt-1">{r.description}</p>
                    <p className="text-white/70 text-xs mt-1">Уроков: {r.lessons.length}</p>
                  </div>
                  <button
                    onClick={() => onDelete(r.id)}
                    className="rounded-md bg-white/10 text-white px-3 py-2 hover:bg-white/15 transition"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {saved && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-white text-black px-4 py-2">
            Сохранено
          </div>
        )}
      </div>
    </BeamsBackground>
  );
}
