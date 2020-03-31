import DetailsBlock from "components/details/details-block";
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
          <DetailsBlock wide table>
            <ManagerPrograms
              title={t("manager-page.history.tabs.programs")}
              ownerId={id}
            />
          </DetailsBlock>
        </Row>
      )}
      {!!followCount && (
        <Row onlyOffset>
          <DetailsBlock wide table>
            <ManagerFollow
              title={t("manager-page.history.tabs.follow")}
              ownerId={id}
            />
          </DetailsBlock>
        </Row>
      )}
      {!!fundsCount && (
        <Row onlyOffset>
          <DetailsBlock wide table>
            <ManagerFunds
              title={t("manager-page.history.tabs.funds")}
              ownerId={id}
            />
          </DetailsBlock>
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
