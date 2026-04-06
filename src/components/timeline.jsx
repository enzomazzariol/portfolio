/* eslint-disable react/jsx-key */
import { timelineData } from "../../public/data/timeline.js";
import Subtitle from './subtitle.jsx';
import TimelineItem from './timelimeItem.jsx';

export default function Timeline() {
  return (
    <div className="flex flex-col md:flex-row justify-center my-20">
      <div className="w-4/5 md:w-7/12">
        <Subtitle>Trayectoria</Subtitle>
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.title}
            year={item.year}
            title={item.title}
            duration={item.duration}
            details={item.details}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
