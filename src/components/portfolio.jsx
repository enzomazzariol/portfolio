/* eslint-disable react/jsx-key */
import { portfolioData } from "../../public/data/portfolio.js";
import PortfolioItem from './portfolioItem.jsx';
import Subtitle from './subtitle.jsx';

export default function Portfolio() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center my-20'>
      <div className='w-4/5 md:w-7/12'>
        <Subtitle>Proyectos</Subtitle>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {portfolioData.map(project => (
          <PortfolioItem
            title={project.title}
            description={project.description}
            imgUrl={project.imgUrl}
            stack={project.stack}
            link={project.link}
            github={project.github}
          />
        ))}
      </div>
      </div>
    </div>
  );
}
