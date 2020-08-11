import { Button } from "components/button/button";
import GVProgramPeriod from "components/gv-program-period";
import { LabeledValue } from "components/labeled-value/labeled-value";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { InvestmentLimitLabel } from "pages/dashboard/components/kyc-limit/investment-limit-label";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import style from "./kyc-limit.view.module.scss";

export interface IKYCLimitViewProps {
  currency: CurrencyEnum;
  invested: number;
  limit: number;
}

const _KYCLimitView: React.FC<IKYCLimitViewProps> = ({
  invested,
  limit,
  currency
}) => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  return (
    <>
      <Row onlyOffset>
        <LabeledValue label={t("Spent")}>
          <Text weight={"bold"} size={"xlarge"}>
            {invested} {currency}
          </Text>
          <Text muted weight={"bold"} size={"xlarge"}>
            &nbsp;-&nbsp;{limit} {currency}
          </Text>
        </LabeledValue>
      </Row>
      <Row wide className={style["kyc-limit-view"]}>
        <RowItem wide bottomOffset>
          <LabeledValue label={<InvestmentLimitLabel />}>
            <Row />
            <Row size={"small"}>
              <GVProgramPeriod
                start={0}
                end={limit}
                value={invested}
                variant="line"
              />
            </Row>
          </LabeledValue>
        </RowItem>
        <RowItem bottomOffset>
          <Link
            to={linkCreator(KYC_ROUTE, KYC_ROUTE, t("create-account:title"))}
          >
            <Button color="primary">{t("Remove the limit")}</Button>
          </Link>
        </RowItem>
      </Row>
    </>
  );
};

export const KYCLimitView = React.memo(_KYCLimitView);
