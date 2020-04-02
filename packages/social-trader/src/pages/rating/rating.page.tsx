import Page from "components/page/page";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { RatingBlockContainer } from "pages/rating/rating.block.container";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";

export const RatingPage: React.FC<Props> = () => {
  const [t] = useTranslation();
  const title = t(`Rating`);
  return (
    <Page title={title}>
      <Row>
        <RowItem wide>
          <RatingBlockContainer
            title={"Follower rating"}
            valueField={"followersCount"}
            sorting={"ByFollowersDesc"}
            renderValue={value => {
              return <>{value}</>;
            }}
          />
        </RowItem>
        <RowItem wide>
          <RatingBlockContainer
            title={"Trading profit rating"}
            valueField={"tradingProfit"}
            sorting={"ByTradingProfitDesc"}
            renderValue={value => {
              return <>{value} %</>;
            }}
          />
        </RowItem>
        {/*<RowItem>
          <RatingBlockContainer
            title={"Invest profit rating"}
            valueField={"investingProfit"}
            sorting={"ByInvestingProfitDesc"}
            renderValue={value => {
              return <>{value} %</>;
            }}
          />
        </RowItem>*/}
        <RowItem wide>
          <RatingBlockContainer
            title={"AUM rating"}
            valueField={"assetsUnderManagement"}
            sorting={"ByAumDesc"}
            renderValue={value => {
              return <>{formatCurrencyValue(+value, "GVT")} GVT</>;
            }}
          />
        </RowItem>
      </Row>
    </Page>
  );
};

interface Props {}
