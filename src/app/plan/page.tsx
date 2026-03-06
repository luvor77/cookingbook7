import { BeamsBackground } from "@/components/ui/beams-background";
import { Component as CTAButton } from "@/components/ui/button-cta";
import { BackButton } from "@/components/ui/back-button";

export default function PlanPage() {
  return (
    <BeamsBackground showDemoText={false}>
      <BackButton />
      <div className="-translate-y-8 sm:-translate-y-12 md:-translate-y-16">
        <div className="flex flex-col items-center gap-3 md:gap-4 px-4 sm:px-6 text-center pt-20 sm:pt-24 md:pt-28">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tighter">
            Выберите приём пищи
          </h1>
          <p className="max-w-[640px] text-sm sm:text-base text-white/80">
            Подберите блюда на завтрак, обед и ужин.
          </p>
        </div>
        <div className="w-full px-4 sm:px-6 mt-8">
          <div className="flex flex-col items-center gap-4">
            <CTAButton href="/plan?meal=breakfast" className="w-[280px] justify-center">
              Выбрать завтрак
            </CTAButton>
            <CTAButton href="/plan?meal=lunch" className="w-[280px] justify-center">
              Выбрать обед
            </CTAButton>
            <CTAButton href="/plan?meal=dinner" className="w-[280px] justify-center">
              Выбрать ужин
            </CTAButton>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
}
