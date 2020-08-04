import { Banner, LOGO_OPTIONS } from "components/banners/600x315";
import { createBannerApi } from "components/banners/utils";
import { ASSET } from "constants/constants";
import React from "react";

export default createBannerApi(Banner, ASSET.FOLLOW, LOGO_OPTIONS);
