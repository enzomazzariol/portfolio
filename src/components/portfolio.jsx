import {portfolioData} from "../data/portfolio.js";
import PortfolioItem from './portfolioItem.jsx'

export default function Portfolio() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {portfolioData.map(project => (
          <PortfolioItem
            title={project.title}
            imgUrl={project.imgUrl}
            stack={project.stack}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
