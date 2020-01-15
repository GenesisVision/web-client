import "./events-list.scss";

import classNames from "classnames";
import { PlatformEvent } from "gv-api-web";
import React, { useEffect, useState } from "react";
import EventItem from "routes/ssr/landing-page/components/events-list/event-item";
import EventLastItem from "routes/ssr/landing-page/components/events-list/event-last-item";

interface Props {
  className?: string;
  events: PlatformEvent[];
}

const _EventsList: React.FC<Props> = ({ className, events }) => {
  const [index, setIndex] = useState(0);
  const [showedEvents, setShowedEvents] = useState(events);
  useEffect(() => {
    events.length && setShowedEvents(events.slice(index, index + 5));
  }, []);
  return (
    <ul className={classNames("events-list", className)}>
      {showedEvents.map((event, index) => (
        <EventItem key={index} {...event} />
      ))}
      <EventLastItem />
    </ul>
  );
};

const EventsList = React.memo(_EventsList);
export default EventsList;
