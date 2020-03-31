import { ProfilePublic, ProfilePublicShort } from "gv-api-web";

export const mockDate = ("2019-09-05T09:50:23.1201470+00:00" as unknown) as Date;

export const managerLoaderData: ProfilePublic = {
  id: "",
  username: "Manager name",
  avatar: "",
  logoUrl: "",
  registrationDate: mockDate,
  url: "",
  socialLinks: []
};

export const ownerLoaderData: ProfilePublicShort = {
  id: "",
  username: "Manager name",
  url: ""
};
