 "use client";
 import * as React from "react";
 import { BeamsBackground } from "@/components/ui/beams-background";
 import { BackButton } from "@/components/ui/back-button";
 import { Component as CTAButton } from "@/components/ui/button-cta";
 
 type Meal = "breakfast" | "lunch" | "dinner";
 type Lesson = { id: string; title: string; videoUrl: string };
type Ingredient = { id: string; name: string; amount?: string };
type Recipe = { id: string; title: string; description?: string; photo?: string; lessons: Lesson[]; createdAt: string; meal: Meal; ingredients?: Ingredient[] };
 
 export default function PlanSummaryPage() {
   const [recipes, setRecipes] = React.useState<Recipe[]>([]);
   const [selection, setSelection] = React.useState<{ breakfast?: string; lunch?: string; dinner?: string }>({});
 
   React.useEffect(() => {
     try {
       const raw = window.localStorage.getItem("recipes");
       setRecipes(raw ? (JSON.parse(raw) as Recipe[]) : []);
     } catch {
       setRecipes([]);
     }
     try {
       const selRaw = window.localStorage.getItem("planSelection");
       setSelection(selRaw ? JSON.parse(selRaw) : {});
     } catch {
       setSelection({});
     }
   }, []);
 
   const findById = React.useCallback(
     (id?: string) => recipes.find((r) => r.id === id),
     [recipes],
   );
 
   const chosen = {
     breakfast: findById(selection.breakfast),
     lunch: findById(selection.lunch),
     dinner: findById(selection.dinner),
   };
 
   return (
     <BeamsBackground showDemoText={false}>
       <BackButton />
       <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 pt-20 sm:pt-24">
         <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight text-center">
           Ваш итоговый рацион
         </h1>
         <p className="text-white/80 text-center mt-2">Проверьте выбранные блюда на завтрак, обед и ужин</p>
 
         <div className="mt-6 grid gap-4">
           {(["breakfast", "lunch", "dinner"] as Meal[]).map((meal) => {
             const r = chosen[meal];
             return (
               <div key={meal} className="rounded-md border border-white/10 p-4">
                 <p className="text-white font-semibold">
                   {meal === "breakfast" ? "Завтрак" : meal === "lunch" ? "Обед" : "Ужин"}
                 </p>
                 {!r && <p className="text-white/60 mt-1">Не выбрано</p>}
                {r && (
                   <div className="mt-1">
                     <p className="text-white">{r.title}</p>
                    {(r.ingredients && r.ingredients.length > 0
                      ? r.ingredients.map(i => i.name).filter(Boolean).join(", ")
                      : r.description) && (
                        <p className="text-white/70 text-sm mt-1">
                          {(r.ingredients && r.ingredients.length > 0
                            ? r.ingredients.map(i => i.name).filter(Boolean).join(", ")
                            : r.description)}
                        </p>
                    )}
                     <p className="text-white/70 text-xs mt-1">Уроков: {r.lessons.length}</p>
                   </div>
                 )}
               </div>
             );
           })}
         </div>
         <div className="flex justify-center mt-6">
           <CTAButton
             href="/plan/breakfast"
             className="w-[260px] justify-center"
             onClick={() => {
               try {
                 window.localStorage.removeItem("planSelection");
               } catch {}
             }}
           >
             Сбросить рацион
           </CTAButton>
         </div>
       </div>
     </BeamsBackground>
   );
 }
