import platformApi from "services/api-client/platform-api";

export const getLandingAssets = () =>
  platformApi.getPlatformLandingInfo({
    eventsTake: 15,
    followTake: 6,
    programsTake: 6,
    fundsTake: 12,
    newsTake: 4
  });

export const landingAssetsDefaultData = {
  events: [],
  follows: {
    total: 0,
    items: []
  },
  programs: {
    total: 0,
    items: []
  },
  funds: {
    total: 0,
    items: []
  },
  news: []
};
