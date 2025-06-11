import ButtonContact from "./buttonContact";
import { EmailIcon, GithubButtonIcon, LinkedinButtonIcon } from "./icons";

export default function Intro() {
   return (
     <div className="flex flex-col items-center justify-center text-center pt-20 pb-16">
       <h1 className="text-4xl font-bold md:text-6xl mb-1 md:mb-3 dark:text-white">
         Enzo Mazzariol
       </h1>
       <p className="text-base md:text-xl mb-3 font-medium">
         Desarrollador Full Stack
       </p>
       <p className="text-sm max-w-xl mb-6 font-bold">
         💻 Soy desarrollador Full Stack con experiencia en el desarrollo web y
         mobile. Los desafíos me motivan y disfruto aprender de ellos cada día
         para mejorar mis habilidades.
       </p>
       <p className="text-sm max-w-xl mb-6 font-bold">
         🚀 Ofrezco soluciones prácticas y personalizadas que resuelvan
         problemas reales. Busco siempre mejorar el proceso de desarrollo,
         priorizando la calidad del código y la experiencia del usuario.
       </p>
       <div className="flex gap-x-3 justify-center items-center mt-2">
         <ButtonContact href="mailto:mazzariolenzo@gmail.com" icon={EmailIcon}>
           Contáctame
         </ButtonContact>

         <ButtonContact
           href="https://www.linkedin.com/in/enzo-mazzariol/"
           icon={LinkedinButtonIcon}
         >
           Linkedin
         </ButtonContact>

         <ButtonContact
           href="https://github.com/enzomazzariol"
           icon={GithubButtonIcon}
         >
           Github
         </ButtonContact>
       </div>
     </div>
   );
}