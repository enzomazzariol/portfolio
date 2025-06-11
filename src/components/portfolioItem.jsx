/* eslint-disable react/prop-types */
import { GithubButtonIcon, PreviewButtonIcon } from "./icons";

export default function PortfolioItem({title, imgUrl, stack, link, github}) {
  return (
    <a
      className="border-2 border-stone-900 rounded-md overflow-hidden dark:border-white"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={imgUrl}
        alt="portfolio"
        className="w-full h-36 md:h-48 cursor-pointer object-cover"
      />
      <div className="w-full p-4">
        <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-light dark:text-white">
          {title}
        </h3>
        <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-md">
          {stack.map((item) => (
            <span
              key={item}
              className="inline-block px-2 py-1 font-light border-2 border-stone-900 rounded-md dark:border-white dark:text-white/90"
            >
              {item}
            </span>
          ))}
        </p>
        <div className="flex gap-2">
          {github && (
            <a
              className="flex justify-start mt-3 gap-2 items-center border-stone-700 border-2 rounded-md p-1 px-3 w-fit"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubButtonIcon />
              <p className="text-sm font-light">Código</p>
            </a>
          )}

          <a
            className="flex justify-start mt-3 gap-2 items-center border-stone-700 border-2 rounded-md p-1 px-3 w-fit"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PreviewButtonIcon />
            <p className="text-sm font-light">Preview</p>
          </a>
        </div>
      </div>
    </a>
  );
}
