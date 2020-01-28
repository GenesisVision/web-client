import { SocialLinkType } from "gv-api-web";
import { getRandomWord } from "utils/helpers";

export const ACTIVE = "asset";

export const ACTIVE_ROUTE = `/${ACTIVE}`;

export const getActiveUrl = (active?: string) => `${ACTIVE_ROUTE}/${active}`;

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
  name: getRandomWord(),
  color: "#f0f0f0"
});
export const tagMocks = Array(5)
  .fill("")
  .map(getTagMock);
