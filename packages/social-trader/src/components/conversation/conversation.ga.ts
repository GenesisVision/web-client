import { sendEventToGA } from "utils/ga";

export const sendPostEvent = (eventValue?: number) =>
  sendEventToGA({
    eventValue,
    eventCategory: "Social",
    eventAction: "SendPost"
  });

export const sendCommentEvent = (eventValue?: number) =>
  sendEventToGA({
    eventValue,
    eventCategory: "Social",
    eventAction: "SendComment"
  });

export const sendLikeEvent = () =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "Like"
  });

export const sendShareEvent = () =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "Share"
  });

export const sendLoadFeedEvent = () =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "LoadFeed"
  });
