import classNames from "classnames";
import GVSwitch from "components/gv-selection/gv-switch";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import "./program-auto-join.scss";
import { toggleAutoJoin } from "./program-auto-join.service";

const ProgramAutoJoinTooltip = () => {
  const [t] = useTranslation();
  return (
    <div>
      {t("program-details-page.tooltip.auto-join.text")}
      <ul>
        <li>{t("program-details-page.tooltip.auto-join.li-1")}</li>
        <li>{t("program-details-page.tooltip.auto-join.li-2")}</li>
      </ul>
    </div>
  );
};

const _ProgramAutoJoin: React.FC<Props> = ({
  isAutoJoin: isAutoJoinProp,
  id
}) => {
  const [t] = useTranslation();
  const [isAutoJoin, setAutoJoin] = useState(isAutoJoinProp);
  const setValue = () => setAutoJoin(!isAutoJoin);
  const { isPending, sendRequest } = useApiRequest({
    request: toggleAutoJoin,
    catchCallback: () => setAutoJoin(isAutoJoin),
    middleware: [setValue]
  });
  const onLabelClick = useCallback(
    () => sendRequest({ id, isAutoJoin: !isAutoJoin }),
    [id, isAutoJoin]
  );
  return (
    <span
      className={classNames("auto-join-widget", {
        "auto-join-widget--active": isAutoJoin
      })}
      onClick={onLabelClick}
    >
      <GVSwitch
        name="auto-join"
        touched={false}
        value={isAutoJoin}
        color="primary"
        onChange={onLabelClick}
        label={
          <TooltipLabel
            tooltipContent={<ProgramAutoJoinTooltip />}
            labelText={t("program-details-page.description.auto-join")}
            className="auto-join-widget__label tooltip__label--cursor-pointer"
          />
        }
        disabled={isPending}
      />
    </span>
  );
};

interface Props {
  isAutoJoin: boolean;
  id: string;
}

const ProgramAutoJoin = React.memo(_ProgramAutoJoin);
export default ProgramAutoJoin;
