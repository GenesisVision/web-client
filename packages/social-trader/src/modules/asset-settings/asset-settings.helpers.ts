import { IImageValue } from "components/form/input-image/input-image";
import { AssetDescriptionType } from "modules/asset-settings/asset-settings.types";

export const getLogoValue = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    hasInvestmentLimit?: number;
    stopOutLevel?: number;
  },
  description: AssetDescriptionType
) => {
  const hasLogoInForm = !!values.logo;
  const newLogo = hasLogoInForm && !!values.logo?.image?.cropped;
  const clearLogo = hasLogoInForm && !values.logo?.src && !newLogo;
  if (!hasLogoInForm) return { src: description.publicInfo.logo };
  if (clearLogo) return {};
  if (newLogo) return values.logo;
  return { src: description.publicInfo.logo };
};
