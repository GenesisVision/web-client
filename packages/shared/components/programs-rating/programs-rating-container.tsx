import "shared/components/programs-rating/programs-rating.scss";

import { CancelablePromise, LevelUpData, LevelUpSummary } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import ProgramsRatingTables from "shared/components/programs-rating/programs-rating-tables";
import { getLevelUpSummary } from "shared/components/programs-rating/services/program-rating-service";
import Surface from "shared/components/surface/surface";
import TabsContainer from "shared/components/tabs-container/tabs-container";
import { RootState } from "shared/reducers/root-reducer";
import { MiddlewareDispatch } from "shared/utils/types";

import { levelDataSelector } from "./reducers/programs-rating.reducers";

class _ProgramsRatingContainer extends React.PureComponent<Props, State> {
  state = {
    tab: undefined,
    navigateTabs: undefined
  };

  componentDidMount() {
    const { service } = this.props;
    service.getLevelUpSummary().then(res => {
      const { levelData } = res;
      const navigateTabs: INavigateTab[] = levelData.map(
        (item: LevelUpData) => ({
          ...item,
          name: String(item.level),
          label: (
            <div className="programs-rating__tab-container">
              <div className="programs-rating__back">{item.level}</div>
              <div className="programs-rating__back-arrow">&rarr;</div>
              <div className="programs-rating__back">{item.level + 1}</div>
            </div>
          ),
          count: item.totalOwn !== 0 ? item.totalOwn : undefined
        })
      );
      const tab = navigateTabs[0];
      this.setState({ navigateTabs, tab });
    });
  }

  handleTabChange = (e: any, tab: string) => {
    const { navigateTabs = [] } = this.state;
    this.setState({
      tab: navigateTabs.find((item: INavigateTab) => item.name === tab)
    });
  };

  render() {
    const { t, id, levelData, title } = this.props;
    const { tab, navigateTabs } = this.state;

    if (!tab || !levelData || !navigateTabs) return null;
    const { level } = tab;
    return (
      <Surface className="programs-rating">
        <h3 className="programs-rating__head">{t("rating-page.title")}</h3>
        <div className="programs-rating__tabs">
          <TabsContainer
            tabs={navigateTabs}
            handleTabChange={this.handleTabChange}
            tab={tab}
          />
        </div>
        <ProgramsRatingTables key={level} tab={tab} id={id} title={title} />
      </Surface>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  levelData: levelDataSelector(state)
});

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    getLevelUpSummary: () => dispatch(getLevelUpSummary())
  }
});

export interface INavigateTab extends LevelUpData {
  name: string;
  label: JSX.Element;
  count?: number;
}

interface OwnProps {
  title: string;
  id?: string;
}

interface StateProps {
  levelData?: LevelUpData[];
}

interface DispatchProps {
  service: { getLevelUpSummary: () => CancelablePromise<LevelUpSummary> };
}

interface Props
  extends InjectedTranslateProps,
    OwnProps,
    StateProps,
    DispatchProps {}

interface State {
  tab?: INavigateTab;
  navigateTabs?: INavigateTab[];
}

const ProgramsRatingContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramsRatingContainer);
export default ProgramsRatingContainer;
