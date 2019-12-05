import * as faker from "faker";
import { SocialLinkType } from "gv-api-web";

export const ACTIVE_ROUTE = "/active";

export const getActiveUrl = (active: string) => `${ACTIVE_ROUTE}/${active}`;

const SocialLinksMock = {
  url: "",
  logo: "",
  name: "",
  value: "",
  type: "Undefined" as SocialLinkType
};
export const SocialLinksMocks = Array(5)
  .fill("")
  .map(() => SocialLinksMock);

export const getTagMock = () => ({
  name: faker.lorem.word(),
  color: "#f0f0f0"
});
export const tagMocks = Array(5)
  .fill("")
  .map(getTagMock);
