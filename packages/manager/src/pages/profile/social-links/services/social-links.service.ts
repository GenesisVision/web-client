import defaultLogo from "../media/default.svg";

export const fetchSocialLinks = (): Promise<SocialLink[]> => {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Twitter",
          logo: defaultLogo,
          url: "https://twitter.com/",
          value: "genesis_vision"
        },
        {
          id: "2",
          name: "Telegram",
          logo: defaultLogo,
          url: "@",
          value: "genesisvision"
        },
        {
          id: "3",
          name: "Facebook",
          logo: defaultLogo,
          url: "https://www.facebook.com/",
          value: ""
        },
        {
          id: "4",
          name: "Email",
          logo: defaultLogo,
          url: "",
          value: "support@genesis.vision"
        }
      ]);
      clearTimeout(timeout);
    }, 200);
  });
};

export const updateSocialLink = (id: string, value: string) => {
  return Promise.resolve();
};

export type SocialLink = {
  id: string;
  name: string;
  logo: string;
  url: string;
  value: string;
};
