import { api } from "services/api-client/swagger-custom-client";

export const getLandingAssets = () =>
  api.platform().getPlatformLandingInfo({
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
