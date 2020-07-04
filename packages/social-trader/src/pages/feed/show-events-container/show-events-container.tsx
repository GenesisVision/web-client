import { ShowEvents } from "pages/feed/show-events-container/show-events";
import { SocialPageContext } from "pages/social/social/social-page.context";
import React, { useCallback, useContext, useState } from "react";

import {
  getShowEventsState,
  setShowEventsState
} from "./show-events-cookie-service";

interface Props {
  isPending?: boolean;
  onChange?: (value: boolean) => void;
}

const _ShowEventsContainer: React.FC<Props & { cookieValue: boolean }> = ({
  cookieValue,
  isPending,
  onChange
}) => {
  const { setShowEvents } = useContext(SocialPageContext);
  const [showState, setShowState] = useState(cookieValue);

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

const _ShowEventsCookieContainer: React.FC<Props> = props => {
  const cookieValue = getShowEventsState();
  if (cookieValue === undefined) return null;
  return <_ShowEventsContainer {...props} cookieValue={cookieValue} />;
};

export const ShowEventsContainer = React.memo(_ShowEventsCookieContainer);
