
export default function PortfolioItem({title, imgUrl, stack, link}) {
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
        <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-light dark:text-white">{title}</h3>
        <p className="flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-md">{stack.map(item => (
            <span className="inline-block px-2 py-1 font-light border-2 border-stone-900 rounded-md dark:border-white dark:text-white/90">
                {item}
            </span>
            ))}
        </p>
      </div>
    </a>
  );
}
