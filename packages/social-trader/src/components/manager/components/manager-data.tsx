import { UserFeed } from "components/conversation/user-feed/user-feed";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import ManagerHistorySection from "components/manager/manager-history/manager-history-section";
import {
  fetchManagerAssetsCount,
  IAssetsCountModel,
  UserDataInitialCount
} from "components/manager/services/manager.service";
import UserInvestingSection from "components/manager/user-investing/user-investing-section";
import { Row } from "components/row/row";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

enum TABS {
  FEED = "FEED",
  TRADING = "TRADING",
  INVESTING = "INVESTING"
}

const _ManagerData: React.FC<Props> = ({ canWritePost, id }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.TRADING);

  const { sendRequest, data = UserDataInitialCount } = useApiRequest<
    IAssetsCountModel
  >({
    request: fetchManagerAssetsCount
  });

  useEffect(() => {
    sendRequest({ ownerId: id });
  }, [id]);

  const {
    investingFollowCount = 0,
    investingProgramsCount = 0,
    investingFundsCount = 0,
    postsCount = 0,
    followCount = 0,
    programsCount = 0,
    fundsCount = 0
  } = data;
  const investingCount =
    investingFollowCount + investingProgramsCount + investingFundsCount;
  const tradingCount = followCount + programsCount + fundsCount;

  useEffect(() => {
    setTab(null, TABS.FEED);
  }, [tradingCount, investingCount]);

  return (
    <div>
      <Row onlyOffset>
        <GVTabs value={tab} onChange={setTab}>
          <GVTab value={TABS.FEED} label={t("Feed")} count={postsCount} />
          <GVTab
            visible={tradingCount > 0}
            value={TABS.TRADING}
            label={t("Trading")}
            count={tradingCount}
          />
          <GVTab
            visible={investingCount > 0}
            value={TABS.INVESTING}
            label={t("Investing")}
            count={investingCount}
          />
        </GVTabs>
      </Row>
      {tab === TABS.FEED && (
        <Row large onlyOffset>
          <UserFeed canWritePost={canWritePost} id={id} />
        </Row>
      )}
      {tab === TABS.TRADING && (
        <Row large onlyOffset>
          <ManagerHistorySection
            followCount={followCount}
            programsCount={programsCount}
            fundsCount={fundsCount}
            id={id}
          />
        </Row>
      )}
      {tab === TABS.INVESTING && (
        <Row large onlyOffset>
          <UserInvestingSection
            followCount={investingFollowCount}
            programsCount={investingProgramsCount}
            fundsCount={investingFundsCount}
            id={id}
          />
        </Row>
      )}
    </div>
  );
};

interface Props {
  canWritePost: boolean;
  id: string;
}

export const ManagerData = React.memo(_ManagerData);
