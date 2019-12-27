import "./events-list.scss";

import classNames from "classnames";
import { PlatformEvent } from "gv-api-web";
import React from "react";
import EventItem from "routes/ssr/landing-page/components/events-list/event-item";
import EventLastItem from "routes/ssr/landing-page/components/events-list/event-last-item";

interface Props {
  className?: string;
  events: PlatformEvent[];
}

const _EventsList: React.FC<Props> = ({ className, events }) => (
  <ul className={classNames("events-list", className)}>
    {events.map((event, index) => (
      <EventItem
        key={index}
        title={event.title}
        text={event.text}
        icon={event.icon}
        url={event.userUrl}
        value={event.value}
      />
    ))}
    <EventLastItem />
  </ul>
);

const EventsList = React.memo(_EventsList);
export default EventsList;
