import "./notifications-widget.scss";

import Chip, { CHIP_TYPE } from "components/chip/chip";
import { RingIcon } from "components/icon/ring-icon";
import * as React from "react";
import { getRandomInteger, getRandomText } from "utils/helpers";

export const NotificationsWidgetTextLoader: React.FC = React.memo(() => (
  <div className="notifications-widget">
    <RingIcon className="notifications-widget__ring" />
    <Chip className="notifications-widget__count" type={CHIP_TYPE.NEGATIVE}>
      {getRandomText({ charset: "numeric", length: getRandomInteger(2, 4) })}
    </Chip>
  </div>
));
