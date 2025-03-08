import { GithubIcon, LinkedinIcon } from './icons.jsx';

export default function Footer() {
  return (
    <div className="py-5 text-center">
      <p className="text-sm mt-2 opacity-50 dark:text-white flex items-center justify-center gap-2">
        &copy; {new Date().getFullYear()} Enzo Mazzariol
        <a
          href="https://github.com/enzomazzariol"
          className="inline-block"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github link"
        >
          <GithubIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/enzo-mazzariol/"
          className="inline-block"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin link"
        >
          <LinkedinIcon />
        </a>
      </p>
    </div>
  );
}
