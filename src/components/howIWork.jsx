import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Subtitle from './subtitle.jsx';

const steps = [
  {
    number: '01',
    title: 'Entendemos el proyecto',
    description:
      'Hablamos sobre tus objetivos, audiencia y requisitos. Prefiero entender bien el problema antes de escribir una sola línea de código.',
  },
  {
    number: '02',
    title: 'Diseño y desarrollo',
    description:
      'Construyo con código limpio, componentes reutilizables y buenas prácticas. Actualizaciones frecuentes para que siempre sepas cómo va el proyecto.',
  },
  {
    number: '03',
    title: 'Entrega y soporte',
    description:
      'Deploy, revisión final y ajustes. Después de entregar, estoy disponible para resolver dudas y aplicar mejoras.',
  },
];

export default function HowIWork() {
  const stepsRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = stepsRef.current.querySelectorAll('.step-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, stepsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full my-20">
      <Subtitle>Cómo trabajo</Subtitle>
      <div
        ref={stepsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        {steps.map(({ number, title, description }) => (
          <div
            key={number}
            className="step-card relative p-6 rounded-xl border border-stone-200 dark:border-stone-700
              bg-stone-50 dark:bg-stone-800/40 overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 -right-1 text-8xl font-bold text-stone-900 dark:text-white opacity-5 select-none leading-none"
            >
              {number}
            </span>
            <p className="text-sm font-semibold text-orange-500 mb-2 tracking-widest">
              {number}
            </p>
            <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-3">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
