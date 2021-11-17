import { Banner, LOGO_OPTIONS } from "components/banners/800x418";
import { createBannerApi } from "components/banners/utils";
import { ASSET } from "constants/constants";
import React from "react";

export default createBannerApi(Banner, ASSET.FUND, LOGO_OPTIONS);
