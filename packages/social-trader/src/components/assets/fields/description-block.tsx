import LogoField from "components/logo-field/logo-field";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DescriptionField from "./description-field";
import TitleField from "./title-field";

interface Props {
  showDescription?: boolean;
  asset?: ASSET;
  titleName: string;
  descriptionName: string;
  logoName: string;
  description: string;
}

const _DescriptionBlock: React.FC<Props> = ({
  showDescription = true,
  asset = ASSET.FUND,
  titleName,
  descriptionName,
  logoName,
  description
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <TitleField name={titleName} />
      {showDescription && (
        <DescriptionField name={descriptionName} description={description} />
      )}
      <LogoField
        name={logoName}
        title={t(`asset-settings:fields.upload-logo`)}
      />
    </div>
  );
};

const DescriptionBlock = React.memo(_DescriptionBlock);
export default DescriptionBlock;
