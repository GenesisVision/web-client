import { ProfileHeaderInfoAction } from "components/header/actions/header-actions";
import SwitchWithQuestion from "components/switch-with-question/switch-with-question";
import { TooltipContent } from "components/tooltip/tooltip-content";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  betaTesterSelector,
  isSocialBetaTester
} from "reducers/header-reducer";

import {
  setSocialTesterOff,
  setSocialTesterOn
} from "./social-beta-select.service";

const _SocialBetaSelect: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const betaTester = useSelector(betaTesterSelector);
  const isBetaTester = isSocialBetaTester(betaTester);
  const [isTester, setTesterValue] = useState(isBetaTester);
  useEffect(() => {
    setTesterValue(isBetaTester);
  }, [isBetaTester]);
  const request = isTester ? setSocialTesterOff : setSocialTesterOn;
  const updateHeaderMiddleware = () => {
    dispatch(ProfileHeaderInfoAction);
  };
  const setMiddleware = () => {
    setTesterValue(!isTester);
  };
  const { isPending, sendRequest } = useApiRequest({
    request,
    middleware: [setMiddleware, updateHeaderMiddleware]
  });
  const handleSwitch = useCallback(() => sendRequest(), [request, isTester]);
  return (
    <SwitchWithQuestion
      onChange={handleSwitch}
      value={isTester}
      isPending={isPending}
      label={t("profile-page:settings.social-beta-select.label")}
      tooltipContent={
        <TooltipContent>
          {t("profile-page:settings.social-beta-select.text")}
        </TooltipContent>
      }
    />
  );
};

const SocialBetaSelect = React.memo(_SocialBetaSelect);
export default SocialBetaSelect;
