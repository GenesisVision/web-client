import "./public-select.scss";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import GVSwitch from "shared/components/gv-selection/gv-switch";
import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { isPublicInvestorSelector } from "shared/reducers/header-reducer";

import { setPublicOff, setPublicOn } from "./public-select.service";

const _PublicSelect: React.FC<Props> = ({ isPublicProp }) => {
  const isPublicInvestor = useSelector(isPublicInvestorSelector);
  const [t] = useTranslation();
  const [isPublic, setPublic, setNotPublic, setPublicValue] = useIsOpen(
    isPublicInvestor
  );
  const request = isPublic ? setPublicOff : setPublicOn;
  const { isPending, sendRequest } = useApiRequest({ request });
  const handleSwitch = useCallback(
    () =>
      sendRequest().then(() => {
        setPublicValue(!isPublic);
      }),
    [request, isPublic]
  );
  return (
    <div className="public-select">
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        render={() => (
          <div className="public-select__tooltip">
            {t("profile-page.settings.public.text")}
          </div>
        )}
      >
        <div className="public-select__question">?</div>
      </Tooltip>
      <div className="public-select__label">
        {t("profile-page.settings.public.label")}
      </div>
      <GVSwitch
        name={"isPublic"}
        touched={false}
        className="public-select__switch"
        value={isPublic}
        disabled={isPending}
        color="primary"
        onChange={handleSwitch}
      />
    </div>
  );
};

interface Props {
  isPublicProp: boolean;
}

const PublicSelect = React.memo(_PublicSelect);
export default PublicSelect;
