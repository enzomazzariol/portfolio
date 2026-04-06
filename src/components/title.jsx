/* eslint-disable react/prop-types */
export default function Title({ children, id }) {
  return (
    <h1
      className="font-display text-2xl font-bold underline underline-offset-8 decoration-4 mb-5 text-stone-900
        dark:text-white"
      id={id && id}
    >
      {children}
    </h1>
  );
}
