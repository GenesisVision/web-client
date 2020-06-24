import classNames from "classnames";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { useToLink } from "components/link/link.helper";
import { Row } from "components/row/row";
import { TableCardTitle } from "components/table/components/table-card/table-card";
import {
  DECIMAL_SCALE_BIG_VALUE,
  DECIMAL_SCALE_SMALL_VALUE
} from "constants/constants";
import { ProgramDetailsListItem } from "gv-api-web";
import { useTranslation } from "i18n";
import { LPTableCardAvatar } from "pages/landing-page/components/lp-table-card/lp-table-card";
import React from "react";
import NumberFormat from "react-number-format";
import { PROGRAM_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeProgramDetailsUrl } from "utils/compose-url";
import { distanceDate } from "utils/dates";
import { formatValueDifferentDecimalScale } from "utils/formatter";

import styles from "./program-short.module.scss";

interface Props {
  program: ProgramDetailsListItem;
  className?: string;
}

const _ProgramShort: React.FC<Props> = ({ program, className }) => {
  const { t } = useTranslation();
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeProgramDetailsUrl(program.url),
    PROGRAM_DETAILS_FOLDER_ROUTE
  );
  return (
    <div className={classNames(styles["program-short"], className)}>
      <LPTableCardAvatar
        logo={program.logoUrl}
        alt={program.title}
        color={program.color}
        level={program.level}
        levelProgress={program.levelProgress}
        url={linkProps}
        contentCenter
      />
      <div className={styles["program-short__period"]}>
        {distanceDate(program.periodStarts, program.periodEnds)}
      </div>
      <TableCardTitle url={linkProps}>{program.title}</TableCardTitle>
      <Row>
        <LabeledValue label={t("header-fields.equity")}>
          <NumberFormat
            value={formatValueDifferentDecimalScale(
              program.balance.amount,
              DECIMAL_SCALE_SMALL_VALUE,
              DECIMAL_SCALE_BIG_VALUE
            )}
            suffix={` ${program.balance.currency}`}
            displayType="text"
          />
        </LabeledValue>
      </Row>
    </div>
  );
};
const ProgramShort = React.memo(_ProgramShort);
export default ProgramShort;
