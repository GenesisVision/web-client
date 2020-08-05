import LogoField from "components/logo-field/logo-field";
import { ASSET } from "constants/constants";
import * as React from "react";
import { useTranslation } from "react-i18next";

import DescriptionField from "./description-field";
import TitleField from "./title-field";

interface Props {
  asset?: ASSET;
  titleName: string;
  descriptionName: string;
  logoName: string;
  description: string;
}

const _DescriptionBlock: React.FC<Props> = ({
  asset = ASSET.FUND,
  titleName,
  descriptionName,
  logoName,
  description
}) => {
  const { t } = useTranslation();
  return (
    <>
      <TitleField name={titleName} />
      <DescriptionField name={descriptionName} description={description} />
      <LogoField
        name={logoName}
        title={t(`asset-settings:fields.upload-logo`)}
      />
    </>
  );
};

const DescriptionBlock = React.memo(_DescriptionBlock);
export default DescriptionBlock;
