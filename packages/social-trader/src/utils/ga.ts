declare global {
  const ga: Function;
}

export const sendMessageToGA = (...args: any) => {
  if (typeof ga === "undefined") return;
  ga(...args);
};

export const sendEventToGA = ({
  eventValue,
  eventCategory,
  eventAction,
  eventLabel
}: {
  eventValue?: number;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
}) =>
  sendMessageToGA("send", {
    hitType: "event",
    eventValue,
    eventCategory,
    eventAction,
    eventLabel
  });
