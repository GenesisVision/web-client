import { DefaultTableBlock } from "components/default.block/default-table.block";
import ManagerFollow from "components/manager/manager-history/manager-follow-table";
import ManagerFunds from "components/manager/manager-history/manager-funds-table";
import ManagerPrograms from "components/manager/manager-history/manager-programs-table";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _UserInvestingHistorySection: React.FC<Props> = ({
  id,
  followCount,
  programsCount,
  fundsCount
}) => {
  const [t] = useTranslation();
  return (
    <>
      {!!programsCount && (
        <Row onlyOffset>
          <DefaultTableBlock wide>
            <ManagerPrograms
              title={t("manager-page.history.tabs.programs")}
              investorId={id}
            />
          </DefaultTableBlock>
        </Row>
      )}
      {!!followCount && (
        <Row onlyOffset>
          <DefaultTableBlock wide>
            <ManagerFollow
              title={t("manager-page.history.tabs.follow")}
              subscriberId={id}
            />
          </DefaultTableBlock>
        </Row>
      )}
      {!!fundsCount && (
        <Row onlyOffset>
          <DefaultTableBlock wide>
            <ManagerFunds
              title={t("manager-page.history.tabs.funds")}
              investorId={id}
            />
          </DefaultTableBlock>
        </Row>
      )}
    </>
  );
};

interface Props {
  followCount: number;
  programsCount: number;
  fundsCount: number;
  id: string;
}

const UserInvestingSection = React.memo(_UserInvestingHistorySection);
export default UserInvestingSection;
