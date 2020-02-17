declare global {
  const ga: Function;
}

export const sendMessageToGA = (...args: any) => {
  if (typeof ga === "undefined") return;
  ga(...args);
};

export const sendEventToGA = ({
  eventCategory,
  eventAction,
  eventLabel
}: {
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
}) =>
  sendMessageToGA("send", {
    hitType: "event",
    eventCategory,
    eventAction,
    eventLabel
  });
