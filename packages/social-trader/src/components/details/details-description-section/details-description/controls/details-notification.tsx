import { Button } from "components/button/button";
import { RingIcon } from "components/icon/ring-icon";
import { ToType } from "components/link/link";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { DescriptionControlIcon } from "./description-control-icon";
import DetailsDescriptionControl from "./details-description-control";

interface Props {
  hasNotifications: boolean;
  to: ToType;
}

const _DetailsNotification: React.FC<Props> = ({ to, hasNotifications }) => {
  const [t] = useTranslation();
  return (
    <Button color={"secondary"} noPadding variant={"text"}>
      <DetailsDescriptionControl
        to={to}
        text={t("asset-details:description.notifications")}
      >
        <DescriptionControlIcon>
          <RingIcon selected={hasNotifications} />
        </DescriptionControlIcon>
      </DetailsDescriptionControl>
    </Button>
  );
};

const DetailsNotification = React.memo(_DetailsNotification);
export default DetailsNotification;
