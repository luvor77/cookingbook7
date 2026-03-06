import Link from "next/link";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Component as CTAButton } from "@/components/ui/button-cta";
import { Settings } from "lucide-react";

export default function Home() {
  return (
    <BeamsBackground showDemoText={false}>
      <Link
        href="/admin"
        aria-label="Админ‑панель"
        className="fixed right-4 top-4 z-30 rounded-md bg-white/10 text-white backdrop-blur px-3 py-2 hover:bg-white/15 transition"
      >
        <Settings className="w-5 h-5" />
      </Link>
      <div className="flex flex-col items-center gap-3 md:gap-4 px-4 sm:px-6 text-center -translate-y-16 sm:-translate-y-20 md:-translate-y-28">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-semibold text-white tracking-tighter">
          Собери свой рацион
        </h1>
        <p className="max-w-[680px] text-sm sm:text-base md:text-lg text-white/80">
          Тут вы можете собрать свой рацион на 2-3 дня, основываясь на колличестве каллорий, вашего КБЖУ и вкусовых предпочтениях
        </p>
      </div>
      <div
        className="fixed z-20 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6"
        style={{ bottom: "max(10rem, calc(env(safe-area-inset-bottom) + 3rem))" }}
      >
        <div className="flex justify-center">
          <CTAButton href="/plan/breakfast">Собрать рацион</CTAButton>
        </div>
      </div>
    </BeamsBackground>
  );
}
