import "./notifications-widget.scss";

import * as React from "react";
import Chip, { CHIP_TYPE } from "shared/components/chip/chip";
import { RingIcon } from "shared/components/icon/ring-icon";
import { getRandomInteger, getRandomText } from "shared/utils/helpers";

export const NotificationsWidgetTextLoader: React.FC = React.memo(() => (
  <div className="notifications-widget">
    <RingIcon className="notifications-widget__ring" />
    <Chip className="notifications-widget__count" type={CHIP_TYPE.NEGATIVE}>
      {getRandomText({ charset: "numeric", length: getRandomInteger(2, 4) })}
    </Chip>
  </div>
));
