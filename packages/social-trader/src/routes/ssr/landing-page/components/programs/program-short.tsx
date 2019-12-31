import "./program-short.scss";

import classNames from "classnames";
import StatisticItem from "components/statistic-item/statistic-item";
import {
  TableCardAvatar,
  TableCardTitle
} from "components/table/components/table-card/table-card";
import {
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "constants/constants";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import React from "react";
import NumberFormat from "react-number-format";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatValueDifferentDecimalScale } from "utils/formatter";

interface Props {
  program: ProgramDetailsListItem;
}

const _ProgramShort: React.FC<Props> = ({ program }) => {
  const { t } = useTranslation();
  const linkProps = {
    pathname: composeProgramDetailsUrl(program.url),
    state: `/ ${program.title}`
  };
  return (
    <div className="program-short">
      <TableCardAvatar
        logo={program.logo}
        hasAvatar
        alt={program.title}
        color={program.color}
        level={program.level}
        levelProgress={program.levelProgress}
        url={linkProps}
      />
      <div className="program-short__period">
        {distanceDate(program.periodStarts, program.periodEnds)}
      </div>
      <TableCardTitle url={linkProps}>{program.title}</TableCardTitle>
      <StatisticItem
        className="program-short__balance"
        label={t("programs-page.programs-header.equity")}
      >
        <NumberFormat
          value={formatValueDifferentDecimalScale(
            program.balance.amount,
            DECIMAL_SCALE_SMALL_VALUE,
            DECIMAL_SCALE_BIG_VALUE
          )}
          suffix={` ${program.balance.currency}`}
          displayType="text"
        />
      </StatisticItem>
    </div>
  );
};
const ProgramShort = React.memo(_ProgramShort);
export default ProgramShort;
