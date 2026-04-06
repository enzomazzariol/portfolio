/* eslint-disable react/prop-types */
import { GithubButtonIcon, PreviewButtonIcon } from "./icons";

function getBadgeColor(tech) {
  const t = tech.toLowerCase();
  if (['react', 'next', 'nextjs', 'react native'].some(k => t.includes(k)))
    return 'bg-blue-500/20 text-blue-700 border-blue-400 dark:text-blue-300 dark:border-blue-500';
  if (['java', 'spring'].some(k => t.includes(k)))
    return 'bg-orange-500/20 text-orange-700 border-orange-400 dark:text-orange-300 dark:border-orange-500';
  if (['wordpress', 'elementor'].some(k => t.includes(k)))
    return 'bg-purple-500/20 text-purple-700 border-purple-400 dark:text-purple-300 dark:border-purple-500';
  if (['html', 'css'].some(k => t.includes(k)))
    return 'bg-red-500/20 text-red-700 border-red-400 dark:text-red-300 dark:border-red-500';
  return 'bg-stone-500/20 text-stone-700 border-stone-400 dark:text-stone-300 dark:border-stone-500';
}

export default function PortfolioItem({ title, imgUrl, stack, link, github }) {
  return (
    <div className="portfolio-card p-[2px] rounded-lg group" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
      <div className="rounded-[6px] overflow-hidden bg-white dark:bg-stone-900 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={imgUrl}
            alt={`Captura del proyecto ${title}`}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        </div>
        <div className="w-full p-4 flex flex-col flex-1">
          <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-light dark:text-white">
            {title}
          </h3>
          <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs mb-3">
            {stack.map((item) => (
              <span
                key={item}
                className={`inline-block px-2 py-1 font-light border rounded-md ${getBadgeColor(item)}`}
              >
                {item}
              </span>
            ))}
          </p>
          <div className="flex gap-2 mt-auto">
            {github && (
              <a
                className="flex justify-start gap-2 items-center border-stone-700 border-2 rounded-md p-1 px-3 w-fit dark:border-stone-500 hover:border-orange-500 transition-colors duration-200"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubButtonIcon />
                <p className="text-sm font-light dark:text-white">Código</p>
              </a>
            )}
            <a
              className="flex justify-start gap-2 items-center border-stone-700 border-2 rounded-md p-1 px-3 w-fit dark:border-stone-500 hover:border-orange-500 transition-colors duration-200"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PreviewButtonIcon />
              <p className="text-sm font-light dark:text-white">Preview</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
