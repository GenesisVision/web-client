import "./dashboard-statistic.scss";

import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import React from "react";

const _DashboardNewUserBlock: React.FC<Props> = ({ leftField, rightField }) => {
  return (
    <div className="dashboard-new-user-block">
      <DashboardNewUserBlockField field={leftField} />
      <DashboardNewUserBlockField field={rightField} />
    </div>
  );
};

const DashboardNewUserBlockField: React.FC<{
  field: NewUserFieldType;
}> = React.memo(({ field: { linkLabel, link, text } }) => {
  const { linkCreator } = useToLink();
  return (
    <div className="dashboard-new-user-block__field">
      <div className="dashboard-new-user-block__text">{text}</div>
      <div className="dashboard-new-user-block__button">
        <Link to={linkCreator(link)}>
          <GVButton size={GV_BTN_SIZE.LARGE} color="primary">
            {linkLabel}
          </GVButton>
        </Link>
      </div>
    </div>
  );
});

interface Props {
  leftField: NewUserFieldType;
  rightField: NewUserFieldType;
}

export type NewUserFieldType = {
  linkLabel: string;
  link: string;
  text: string | JSX.Element;
};

export const DashboardNewUserBlock = React.memo(_DashboardNewUserBlock);
