import "./manager.page.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Page from "shared/components/page/page";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import SvgLoader from "shared/components/svg-loader/svg-loader";
import TableLoader from "shared/components/table/components/table-loader";

const _ManagerPageLoader: React.FC<Props> = ({ t }) => (
  <Page title={t("manager-page.title")}>
    <div className="manager">
      <div className="manager__description">
        <div className="manager-description">
          <div className="manager-description__left">
            <ProfileAvatar
              className="manager-description__avatar"
              url={""}
              alt={""}
            />
          </div>
          <div className="manager-description__main">
            <h1 className="title-small-padding">
              <div style={{ width: 150 }}>
                <SvgLoader height={32} width={150}>
                  <rect x="0" y="0" rx="10" ry="10" width="150" height="32" />
                </SvgLoader>
              </div>
            </h1>
            <div className="manager-description__date">
              <div style={{ width: 150 }}>
                <SvgLoader height={13} width={150}>
                  <rect x="0" y="0" rx="5" ry="5" width="100" height="13" />
                </SvgLoader>
              </div>
            </div>
            <div className="manager-description__info">
              <h4 className="manager-description__subheading">
                {t("manager-page.about")}
              </h4>
              <div className="manager-description__text" style={{ width: 250 }}>
                <SvgLoader height={65} width={250}>
                  <rect x="0" y="0" rx="5" ry="5" width="80" height="13" />
                  <rect x="90" y="0" rx="5" ry="5" width="100" height="13" />
                  <rect x="200" y="0" rx="5" ry="5" width="50" height="13" />

                  <rect x="0" y="26" rx="5" ry="5" width="50" height="13" />
                  <rect x="60" y="26" rx="5" ry="5" width="80" height="13" />
                  <rect x="150" y="26" rx="5" ry="5" width="100" height="13" />

                  <rect x="0" y="52" rx="5" ry="5" width="100" height="13" />
                  <rect x="110" y="52" rx="5" ry="5" width="50" height="13" />
                  <rect x="170" y="52" rx="5" ry="5" width="80" height="13" />
                </SvgLoader>
              </div>
              <div className="manager-description__short-statistic">
                <div className="manager-description__short-statistic-item">
                  <StatisticItem label={t("manager-page.assets")}>
                    <div style={{ width: 110 }}>
                      <SvgLoader height={15} width={110}>
                        <rect
                          x="0"
                          y="0"
                          rx="5"
                          ry="5"
                          width="30"
                          height="15"
                        />
                        <rect
                          x="35"
                          y="0"
                          rx="5"
                          ry="5"
                          width="30"
                          height="15"
                        />
                        <rect
                          x="70"
                          y="0"
                          rx="5"
                          ry="5"
                          width="30"
                          height="15"
                        />
                      </SvgLoader>
                    </div>
                  </StatisticItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="manager__history">
        <Surface className="manager-history">
          <div className="manager-history__heading">
            <h3>{t("manager-page.assets")}</h3>
          </div>
          <div className="manager-history__tabs">
            <GVTabs value={""}>
              <GVTab
                value={""}
                label={t("manager-page.history.tabs.programs")}
                count={0}
              />
              <GVTab
                value={""}
                label={t("manager-page.history.tabs.funds")}
                count={0}
              />
            </GVTabs>
          </div>
          <div className="table-wrapper">
            <div className="table__toolbar" />
            <table className="table">
              <tbody>
                <TableLoader />
              </tbody>
            </table>
          </div>
        </Surface>
      </div>
    </div>
  </Page>
);

interface Props extends InjectedTranslateProps, OwnProps {}

interface OwnProps {}

const ManagerPageLoader = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_ManagerPageLoader);
export default ManagerPageLoader;
