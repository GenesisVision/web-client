import SwitchWithQuestion from "components/switch-with-question/switch-with-question";
import { TooltipContent } from "components/tooltip/tooltip-content";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isPublicInvestorSelector } from "reducers/header-reducer";

import { setPublicOff, setPublicOn } from "./public-select.service";

const _PublicSelect: React.FC = () => {
  const isPublicInvestor = useSelector(isPublicInvestorSelector);
  const [t] = useTranslation();
  const [isPublic, setPublicValue] = useState(isPublicInvestor);
  useEffect(() => {
    setPublicValue(isPublicInvestor);
  }, [isPublicInvestor]);
  const request = isPublic ? setPublicOff : setPublicOn;
  const setPublicMiddleware = () => {
    setPublicValue(!isPublic);
  };
  const { isPending, sendRequest } = useApiRequest({
    request,
    middleware: [setPublicMiddleware]
  });
  const handleSwitch = useCallback(() => sendRequest(), [request, isPublic]);
  return (
    <SwitchWithQuestion
      onChange={handleSwitch}
      value={isPublic}
      isPending={isPending}
      label={t("profile-page.settings.public.label")}
      tooltipContent={
        <TooltipContent>
          {t("profile-page.settings.public.text")}
        </TooltipContent>
      }
    />
  );
};

const PublicSelect = React.memo(_PublicSelect);
export default PublicSelect;
