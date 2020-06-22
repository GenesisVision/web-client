import withLoader from "decorators/with-loader";
import { PrivateTradingAccountFull } from "gv-api-web";
import { CLOSEABLE_ASSET } from "modules/asset-settings/close-asset/close-asset";
import CloseAssetBlock from "modules/asset-settings/close-asset/close-asset-block";
import ChangePassword from "pages/invest/programs/programs-settings/change-password/change-password";
import React from "react";
import { useTranslation } from "react-i18next";

const _AccountSettings: React.FC<Props> = ({ details, closeProgram }) => {
  const [t] = useTranslation();
  return (
    <>
      <ChangePassword
        condition={
          details.ownerActions.canChangePassword &&
          details.ownerActions.canClose
        }
        title={details.publicInfo.title}
        id={details.id}
      />
      <CloseAssetBlock
        label={t("asset-settings:close-program.title")}
        asset={CLOSEABLE_ASSET.TRADING_ACCOUNT}
        canCloseAsset={details.ownerActions.canClose}
        id={details.id}
        closeAsset={closeProgram}
      />
    </>
  );
};

interface Props {
  details: PrivateTradingAccountFull;
  closeProgram: () => void;
}

const AccountSettings = withLoader(React.memo(_AccountSettings));
export default AccountSettings;
