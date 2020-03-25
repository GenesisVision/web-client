import { PostListContainer } from "components/conversation/post-list/post-list.container";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import ManagerHistorySection from "components/manager/manager-history/manager-history-section";
import {
  fetchManagerAssetsCount,
  IAssetsCountModel
} from "components/manager/services/manager.service";
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

const _ManagerData: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const { tab, setTab } = useTab<TABS>(TABS.FEED);

  const {
    sendRequest,
    data = { postsCount: 0, followCount: 0, programsCount: 0, fundsCount: 0 }
  } = useApiRequest<IAssetsCountModel>({
    request: fetchManagerAssetsCount
  });

  useEffect(() => {
    sendRequest(id);
  }, [id]);

  const {
    postsCount = 0,
    followCount = 0,
    programsCount = 0,
    fundsCount = 0
  } = data;
  const tradingCount = followCount + programsCount + fundsCount;

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
          {/*<GVTab value={TABS.INVESTING} label={t("Investing")} />*/}
        </GVTabs>
      </Row>
      {tab === TABS.FEED && (
        <Row large onlyOffset>
          <PostListContainer id={id} />
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
    </div>
  );
};

interface Props {
  id: string;
}

export const ManagerData = React.memo(_ManagerData);
