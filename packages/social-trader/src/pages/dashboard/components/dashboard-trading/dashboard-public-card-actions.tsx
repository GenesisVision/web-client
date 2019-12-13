import {
  TableCardActions,
  TableCardActionsItem
} from "components/table/components/table-card/table-card-actions";
import { AssetType } from "gv-api-web";
import { TAnchor, TEvent } from "hooks/anchor.hook";
import ClosePeriodButton from "modules/asset-settings/close-period/close-period-button";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import ChangeAccountPasswordButton from "pages/programs/programs-settings/change-password/change-password-trading-account.button";
import React, { useContext } from "react";
import { META_TRADER_4_ROUTE } from "routes/trade.routes";
import { useTranslation } from "shared/i18n";
import {
  createFundSettingsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

import { TitleContext } from "../../dashboard.constants";

const _DashboardPublicCardActions: React.FC<
  IDashboardPublicCardActionsProps
> = ({
  canEdit,
  assetType,
  canMakeProgram,
  anchor,
  clearAnchor,
  url,
  id,
  showChangePassword,
  showTerminal,
  showClosePeriod
}) => {
  const title = useContext(TitleContext);
  const [t] = useTranslation();
  const terminalLink = {
    pathname: META_TRADER_4_ROUTE,
    state: `/ ${title}`
  };
  const createSettingsToUrlMethod =
    assetType === "Fund" ? createFundSettingsToUrl : createProgramSettingsToUrl;
  const settingsLink = createSettingsToUrlMethod(url, title);
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.SIGNAL,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = {
    pathname: makeProgramLinkMethod(id),
    state: `/ ${title}`
  };
  return (
    <TableCardActions anchor={anchor} clearAnchor={clearAnchor}>
      {canMakeProgram && (
        <TableCardActionsItem to={makeProgramLink} onClick={clearAnchor}>
          {t("dashboard-page.trading.actions.make-program")}
        </TableCardActionsItem>
      )}
      {canEdit && (
        <TableCardActionsItem to={settingsLink} onClick={clearAnchor}>
          {t("dashboard-page.trading.actions.settings")}
        </TableCardActionsItem>
      )}
      {showTerminal && (
        <TableCardActionsItem to={terminalLink} onClick={clearAnchor}>
          {t("dashboard-page.trading.actions.terminal")}
        </TableCardActionsItem>
      )}
      {showClosePeriod && <ClosePeriodButton id={id} />}
      {showChangePassword && (
        <ChangeAccountPasswordButton id={id} title={title} />
      )}
    </TableCardActions>
  );
};

interface IDashboardPublicCardActionsProps {
  canEdit: boolean;
  assetType: AssetType;
  clearAnchor: VoidFunction;
  anchor: TAnchor;
  url: string;
  id: string;
  showChangePassword: boolean;
  showTerminal: boolean;
  showClosePeriod: boolean;
}
export const DashboardPublicCardActions = React.memo(
  _DashboardPublicCardActions
);
