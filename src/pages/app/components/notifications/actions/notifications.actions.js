import { groupBy } from "lodash/collection";
import moment from "moment";
import * as uuid from "uuid";

const mockNoti = () => {
  const n = [];
  for (let i = 0; i < 20; i++) {
    n.push({
      id: `mega-uniq-id-no-${i}`,
      date:
        i > 5
          ? i > 15
            ? moment()
                .subtract(1, "days")
                .format()
            : moment()
                .subtract(4, "days")
                .format()
          : moment().format(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, numquam!"
    });
  }
  return n;
};

export const notificationsToggle = () => ({
  type: "NOTIFICATIONS_TOGGLE"
});

export const notificationsFetch = () => ({
  type: "NOTIFICATIONS",
  payload: new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockNoti());
    }, 300);
  })
});
