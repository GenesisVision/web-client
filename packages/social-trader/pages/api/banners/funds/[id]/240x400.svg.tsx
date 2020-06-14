import { Banner } from "components/banners/240x400";
import { createBannerApi } from "components/banners/utils";
import { ASSET } from "constants/constants";

export default createBannerApi(Banner, ASSET.FUND);
