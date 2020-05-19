import { Center } from "components/center/center";
import GVSwitch from "components/gv-switch";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { toggleReinvesting } from "../services/program-reinvesting.service";

const _ProgramReinvestingContainer: React.FC<Props> = ({
  isReinvesting: propIsReinvesting,
  id
}) => {
  const [t] = useTranslation();
  const [isReinvesting, setIsReinvestingValue] = useState(propIsReinvesting);
  const setValue = () => setIsReinvestingValue(!isReinvesting);
  const { isPending, sendRequest } = useApiRequest({
    request: toggleReinvesting,
    catchCallback: () => setIsReinvestingValue(isReinvesting),
    middleware: [setValue]
  });
  const onReinvestingLabelClick = useCallback(
    () => sendRequest({ id, isReinvesting: !isReinvesting }),
    [id, isReinvesting]
  );
  return (
    <Center onClick={onReinvestingLabelClick}>
      <GVSwitch
        name="reinvesting"
        touched={false}
        value={isReinvesting}
        color="primary"
        onChange={onReinvestingLabelClick}
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.reinvest")}
            labelText={t("program-details-page.description.reinvest")}
            pointer
          />
        }
        disabled={isPending}
      />
    </Center>
  );
};

interface Props {
  isReinvesting: boolean;
  id: string;
}

const ProgramReinvestingContainer = React.memo(_ProgramReinvestingContainer);
export default ProgramReinvestingContainer;
