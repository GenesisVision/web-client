import { DefaultTableBlock } from "components/default.block/default-table.block";
import ManagerPrograms from "components/manager/manager-history/manager-programs-table";
import { Row } from "components/row/row";
import dynamic from "next/dynamic";
import * as React from "react";
import { useTranslation } from "react-i18next";

const ManagerFollow = dynamic(() => import("./manager-follow-table"));
const ManagerFunds = dynamic(() => import("./manager-funds-table"));

const _ManagerHistorySection: React.FC<Props> = ({
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
              ownerId={id}
            />
          </DefaultTableBlock>
        </Row>
      )}
      {!!followCount && (
        <Row onlyOffset>
          <DefaultTableBlock wide>
            <ManagerFollow
              title={t("manager-page.history.tabs.follow")}
              ownerId={id}
            />
          </DefaultTableBlock>
        </Row>
      )}
      {!!fundsCount && (
        <Row onlyOffset>
          <DefaultTableBlock wide>
            <ManagerFunds
              title={t("manager-page.history.tabs.funds")}
              ownerId={id}
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

const ManagerHistorySection = React.memo(_ManagerHistorySection);
export default ManagerHistorySection;
