import { ShowEvents } from "pages/feed/show-events-container/show-events";
import { FeedContext } from "pages/social/social/feed.context";
import React, { useCallback, useContext, useState } from "react";

import { setShowEventsState } from "./show-events-cookie-service";

interface Props {
  isPending?: boolean;
  onChange?: (value: boolean) => void;
}

const _ShowEventsContainer: React.FC<Props> = ({ isPending, onChange }) => {
  const { showEvents = true, setShowEvents } = useContext(FeedContext);
  const [showState, setShowState] = useState(showEvents);

  const handleChange = useCallback(() => {
    const newValue = !showState;
    setShowState(newValue);
    setShowEventsState(newValue);
    onChange && onChange(newValue);
    setShowEvents(newValue);
  }, [showState, onChange]);

  return (
    <ShowEvents
      value={showState}
      onChange={handleChange}
      isPending={isPending}
    />
  );
};

export const ShowEventsContainer = React.memo(_ShowEventsContainer);
