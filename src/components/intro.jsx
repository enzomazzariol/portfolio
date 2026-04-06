import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ButtonContact from './buttonContact';
import { EmailIcon, GithubButtonIcon, LinkedinButtonIcon } from './icons';

export default function Intro() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-animate',
        { clipPath: 'inset(100% 0% 0% 0%)', y: 40, opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="flex flex-col items-center justify-center text-center pt-20 pb-8 px-4">
      <h1 className="intro-animate text-4xl font-bold tracking-tight md:text-6xl mb-2 md:mb-3 dark:text-white">
        Enzo Mazzariol
      </h1>
      <p className="intro-animate text-base md:text-lg text-stone-600 dark:text-stone-400 font-medium mb-6">
        Desarrollador Full Stack · Becario en Guarapo Media · UPF
      </p>
      <p className="intro-animate text-sm md:text-base max-w-xl mb-4 leading-relaxed text-stone-700 dark:text-stone-300">
        Desarrollo web y móvil con React, Node.js y Java. Ahora trabajo en
        proyectos como New Vision, HolaAtelier y todounminuto.com, y estudio
        Ingeniería Audiovisual Computacional en la Universitat Pompeu Fabra.
      </p>
      <p className="intro-animate text-sm md:text-base max-w-xl mb-8 leading-relaxed text-stone-700 dark:text-stone-300">
        Me gusta resolver problemas reales con código claro, buena UX y
        aprendizaje continuo. Si tienes un proyecto en mente, podemos hablar.
      </p>
      <div className="intro-animate flex gap-x-3 justify-center items-center flex-wrap gap-y-3">
        <ButtonContact href="mailto:mazzariolenzo@gmail.com" icon={EmailIcon}>
          Contáctame
        </ButtonContact>
        <ButtonContact
          href="https://www.linkedin.com/in/enzo-mazzariol/"
          icon={LinkedinButtonIcon}
        >
          LinkedIn
        </ButtonContact>
        <ButtonContact
          href="https://github.com/enzomazzariol"
          icon={GithubButtonIcon}
        >
          GitHub
        </ButtonContact>
      </div>
    </header>
  );
}
