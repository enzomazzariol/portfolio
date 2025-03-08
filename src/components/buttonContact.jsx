/* eslint-disable react/prop-types */

export default function ButtonContact({ href, icon: Icon, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Email link">
      <button
        type="button"
        className="flex text-center gap-x-3 px-3 py-1 w-max text-base font-medium rounded-full text-stone-900 border-stone-800 border
        dark:text-stone-300 dark:border-stone-400
        hover:scale-105 transition-transform duration-300"
      >
        <Icon />
        {children}
      </button>
    </a>
  );
}