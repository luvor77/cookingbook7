"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
  imageContainerClass,
  layoutClass,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
  imageContainerClass?: string;
  layoutClass?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials]);

  const handlePrev = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const displayIndex = !testimonials || testimonials.length === 0
    ? 0
    : Math.min(active, testimonials.length - 1);

  const rotateForIndex = (i: number) => ((i * 7) % 21) - 10;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-8", className)}>
      <div className={cn("relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20", layoutClass)}>
        <div>
          <div className={cn("relative", imageContainerClass || "h-64 w-64 md:h-80 md:w-80")}>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotateForIndex(index),
                  }}
                  animate={{
                    opacity: index === displayIndex ? 1 : 0.7,
                    scale: index === displayIndex ? 1 : 0.95,
                    z: index === displayIndex ? 0 : -100,
                    rotate: index === displayIndex ? 0 : rotateForIndex(index),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: index === displayIndex ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotateForIndex(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {testimonial.src.startsWith("data:image") ? (
                    // use native img for data URLs to avoid next/image quirks
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  ) : (
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                      unoptimized
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-2">
          <motion.div
            key={displayIndex}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-white">{testimonials[displayIndex].name}</h3>
            <p className="text-sm text-white/60">{testimonials[displayIndex].designation}</p>
            <motion.p className="text-base text-white/70 mt-6">
              {testimonials[displayIndex].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-3 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group"
            >
              <IconArrowLeft className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group"
            >
              <IconArrowRight className="h-5 w-5 text-white group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
