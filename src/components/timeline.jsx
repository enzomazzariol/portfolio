import TimelineItem from './timelimeItem.jsx'
import {timelineData} from "../data/timeline.js";
import Title from './title.jsx';

export default function Timeline() {
  return (
    <div className="flex flex-col md:flex-row justify-center my-20">
      <div className="w-4/5 md:w-7/12">
      <Title>Timeline</Title>
        {timelineData.map((item) => (
          <TimelineItem
            year={item.year}
            title={item.title}
            duration={item.duration}
            details={item.details}
          />
        ))}
      </div>
    </div>
  );
}
