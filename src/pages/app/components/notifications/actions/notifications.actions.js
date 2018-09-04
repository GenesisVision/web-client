import moment from "moment";

const mockNoti = () => {
  console.info("mock info notifications");
  const n = [];
  for (let i = 0; i < 20; i++) {
    n.push({
      id: `mega-uniq-id-no-${i}`,
      date:
        i > 5
          ? i > 15
            ? moment()
                .subtract(1, "months")
                .format()
            : moment()
                .subtract(2, "months")
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
