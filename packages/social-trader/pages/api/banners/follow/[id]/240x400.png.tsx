import { Banner, LOGO_OPTIONS } from "components/banners/240x400";
import { createBannerApi } from "components/banners/utils";
import { ASSET } from "constants/constants";
import React from "react";

export default createBannerApi(Banner, ASSET.FOLLOW, LOGO_OPTIONS);
