import moment from "moment";

moment.relativeTimeThreshold("ss", 3);
moment.relativeTimeThreshold("s", 60);
moment.relativeTimeThreshold("m", 60);
moment.relativeTimeThreshold("h", 24);
moment.relativeTimeThreshold("d", 30);
moment.relativeTimeThreshold("M", 12);
