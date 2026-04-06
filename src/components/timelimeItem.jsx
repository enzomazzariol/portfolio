/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TimelineItem({ year, title, duration, details, index }) {
  const itemRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    const xFrom = isMobile ? -60 : (index % 2 === 0 ? -60 : 60);

    const ctx = gsap.context(() => {
      // Fade + slide animation for the whole item
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, x: xFrom },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Dot pop + pulse animation
      gsap.fromTo(
        dotRef.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(dotRef.current, {
                scale: 1.5,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut',
                onComplete: () => {
                  gsap.to(dotRef.current, {
                    scale: 1,
                    boxShadow: '0 0 0 4px rgba(249,115,22,0.3)',
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                  });
                },
              });
            },
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <ol className="flex flex-col md:flex-row relative border-l border-stone-200 dark:border-stone-700">
      <li ref={itemRef} className="mb-10 ml-4 relative overflow-hidden">
        {/* Número decorativo de fondo */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 text-8xl font-bold opacity-10 select-none pointer-events-none text-stone-900 dark:text-white leading-none"
        >
          {year}
        </span>

        {/* Punto de la línea */}
        <div
          ref={dotRef}
          className="absolute w-3 h-3 bg-orange-400 rounded-full mt-1.5 -left-1.5 border-2 border-white dark:border-stone-900"
        />

        <p className="flex flex-wrap gap-4 flex-row items-center justify-start text-xs md:text-sm">
          <span className="inline-block px-2 py-1 font-semibold text-white bg-stone-900 rounded-md dark:text-stone-900 dark:bg-stone-200">
            {year}
          </span>
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">{title}</h3>
          <div className="my-1 text-sm font-normal leading-none text-stone-400 dark:text-stone-400">
            {duration}
          </div>
        </p>
        <p className="my-2 text-base font-normal text-stone-500 dark:text-stone-200">{details}</p>
      </li>
    </ol>
  );
}
