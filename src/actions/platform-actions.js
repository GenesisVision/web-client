import platformApi from "services/api-client/platform-api";

export const PLATFORM_SETTINGS = "PLATFORM_SETTINGS";

const fetchPlatformSettings = {
  type: PLATFORM_SETTINGS,
  payload: platformApi.v10PlatformInfoGet().then(data => {
    data.facets = [
      {
        id: "1",
        title: "title",
        description: "description",
        logo: "http://via.placeholder.com/315x140"
      },
      {
        id: "2",
        title: "title 2",
        description: "description 2",
        logo: "http://via.placeholder.com/315x140"
      },
      {
        id: "3",
        title: "title 3",
        description: "description 3",
        logo: "http://via.placeholder.com/315x140"
      },
      {
        id: "4",
        title: "title 4",
        description: "description 4",
        logo: "http://via.placeholder.com/315x140"
      }
    ];
    return data;
  })
};

const platformActions = {
  fetchPlatformSettings
};

export default platformActions;
