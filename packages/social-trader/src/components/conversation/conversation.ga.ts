import { sendEventToGA } from "utils/ga";

export const sendPostEvent = (eventValue?: number) =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "SendPost"
  });

export const sendCommentEvent = (eventValue?: number) =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "SendComment"
  });

export const sendLikeEvent = () =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "Like"
  });

export const sendReportEvent = () =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "Report"
  });

export const sendEditEvent = () =>
  sendEventToGA({
    eventCategory: "Social",
    eventAction: "Edit"
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
