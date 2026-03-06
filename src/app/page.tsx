import { BeamsBackground } from "@/components/ui/beams-background";
import { Component as CTAButton } from "@/components/ui/button-cta";

export default function Home() {
  return (
    <BeamsBackground showDemoText={false}>
      <div className="flex flex-col items-center gap-3 md:gap-4 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-semibold text-white tracking-tighter">
          Собери свой рацион
        </h1>
        <p className="max-w-[680px] text-sm sm:text-base md:text-lg text-white/80">
          Тут вы можете собрать свой рацион на 2-3 дня, основываясь на колличестве каллорий, вашего КБЖУ и вкусовых предпочтениях
        </p>
      </div>
      <div
        className="fixed z-20 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6"
        style={{ bottom: "max(3rem, calc(env(safe-area-inset-bottom) + 1rem))" }}
      >
        <div className="flex justify-center">
          <CTAButton>Собрать рацион</CTAButton>
        </div>
      </div>
    </BeamsBackground>
  );
}
