import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import { Row } from "components/row/row";
import { AssetTypeExt, PrivateTradingAccountType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "../asset-settings.module.scss";
import ConfirmCloseAssetContainer from "./confirm-close-asset-container";

const _CloseAsset: React.FC<Props> = ({ asset, id, onApply, canClose }) => {
  const [t] = useTranslation();
  const [isCloseAssetOpen, setCloseAssetOpen, setCloseAssetClose] = useIsOpen();
  return (
    <>
      <Row onlyOffset className={styles["asset-settings__block-wrapper"]}>
        <FormTextField>
          {t(`asset-settings:period-and-closing.text-${asset.toLowerCase()}`)}
        </FormTextField>
        <Row large>
          <GVButton
            color="danger"
            disabled={!canClose}
            onClick={setCloseAssetOpen}
          >
            {t(`asset-settings:buttons.close-${asset.toLowerCase()}`)}
          </GVButton>
        </Row>
      </Row>
      <ConfirmCloseAssetContainer
        asset={asset}
        open={isCloseAssetOpen}
        onClose={setCloseAssetClose}
        onApply={onApply}
        id={id}
      />
    </>
  );
};

interface Props {
  asset: CloseableAssetType;
  canClose: boolean;
  onApply: () => void;
  id: string;
}

export enum CLOSEABLE_ASSET {
  FOLLOW = "Follow",
  PROGRAM = "Program",
  FUND = "Fund",
  TRADING_ACCOUNT = "Trading-account"
}

export type CloseableAssetType =
  | CLOSEABLE_ASSET
  | PrivateTradingAccountType
  | AssetTypeExt;

const CloseAsset = React.memo(_CloseAsset);
export default CloseAsset;
