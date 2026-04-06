export default function Availability() {
  return (
    <div className="flex justify-center pb-6">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400">
          Disponible para proyectos freelance
          <span className="hidden md:inline"> · Respondo en menos de 24h</span>
        </p>
      </div>
    </div>
  );
}
