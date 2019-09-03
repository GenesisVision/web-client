import moment from "moment";

moment.defaultFormat = "YYYY-MM-DD HH:mm:ss";
moment.relativeTimeThreshold("ss", 3);
moment.relativeTimeThreshold("s", 60);
moment.relativeTimeThreshold("m", 60);
moment.relativeTimeThreshold("h", 24);
moment.relativeTimeThreshold("d", 30);
moment.relativeTimeThreshold("M", 12);
moment.locale("en", {
  relativeTime: {
    s: "%d seconds",
    m: "%d minutes",
    h: "%d hours",
    d: "%d days"
  }
});
