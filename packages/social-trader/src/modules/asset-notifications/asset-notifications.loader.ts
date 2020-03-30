import { ProgramNotificationSettingList } from "gv-api-web";
import { getRandomWord } from "utils/helpers";

export const assetNotificationsLoaderData: ProgramNotificationSettingList = {
  assetId: getRandomWord(),
  color: "",
  level: 0,
  levelProgress: 0,
  logo: "",
  logoUrl: "",
  settingsCustom: [],
  settingsGeneral: [],
  title: "",
  url: ""
};
