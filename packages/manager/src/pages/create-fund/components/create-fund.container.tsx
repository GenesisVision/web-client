import { CreateAssetBack } from "components/create-asset/create-asset-back";
import { goBack } from "connected-react-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ASSET } from "shared/constants/constants";

import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC<Props> = ({minimumDepositAmount}) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  return (
    <>
      <CreateAssetBack asset={ASSET.PROGRAM} onApply={() => dispatch(goBack)} />
      <div className="create-asset__header">
        <h1>{t("manager.create-fund-page.title")}</h1>
      </div>
      <div className="create-asset__content">
        <CreateFundSettingsSection minimumDepositAmount={minimumDepositAmount} />
      </div>
    </>
  );
};

interface Props {
  minimumDepositAmount: number;
}

const CreateFundContainer = React.memo(_CreateFundContainer);
export default CreateFundContainer;
