import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact,
  SiNodedotjs,
  SiOpenjdk,
  SiSpringboot,
  SiTailwindcss,
  SiMysql,
  SiWordpress,
  SiExpo,
  SiGit,
} from 'react-icons/si';
import Subtitle from './subtitle.jsx';

const technologies = [
  { name: 'React',         Icon: SiReact,       color: '#61DAFB' },
  { name: 'Node.js',       Icon: SiNodedotjs,   color: '#339933' },
  { name: 'Java',          Icon: SiOpenjdk,     color: '#f89820' },
  { name: 'Spring Boot',   Icon: SiSpringboot,  color: '#6DB33F' },
  { name: 'Tailwind CSS',  Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'MySQL',         Icon: SiMysql,       color: '#4479A1' },
  { name: 'WordPress',     Icon: SiWordpress,   color: '#21759B' },
  { name: 'Expo',          Icon: SiExpo,        color: '#000020' },
  { name: 'Git',           Icon: SiGit,         color: '#F05032' },
];

export default function Stack() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gridRef.current.querySelectorAll('.stack-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full my-20">
      <Subtitle>Stack</Subtitle>
      <div
        ref={gridRef}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4"
      >
        {technologies.map(({ name, Icon, color }) => (
          <div
            key={name}
            className="stack-item flex flex-col items-center gap-2 p-4 rounded-xl border border-stone-200 dark:border-stone-700
              bg-stone-50 dark:bg-stone-800/40 hover:border-stone-400 dark:hover:border-stone-500
              hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200 cursor-default group"
          >
            <Icon
              size={32}
              style={{ color }}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="text-[10px] md:text-xs text-center font-medium text-stone-600 dark:text-stone-400 leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
