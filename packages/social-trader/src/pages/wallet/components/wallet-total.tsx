import Page from "components/page/page";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletSummary } from "gv-api-web";
import WalletSettingsContainer from "pages/wallet/components/wallet-settings/wallet-settings-container";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import {
  $dividerPadding,
  $paddingMedium,
  $paddingXsmall
} from "utils/style/sizes";

import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletTablesTotal from "./wallet-tables/wallet-tables-total";

interface Props {
  data: WalletSummary;
}

const TitleBlock = styled.div`
  padding: 0 ${$paddingXsmall / $dividerPadding}px;
  ${mediaBreakpointLandscapePhone(`
    padding: 0 0 ${$paddingMedium}px;
  `)}
`;

const _WalletTotal: React.FC<Props> = ({ data: wallet }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("wallet-page:title")}>
      <TitleBlock>
        <Row wrap>
          <RowItem>
            <h1>{t("wallet-page:title")}</h1>
          </RowItem>
          <RowItem>
            <WalletSettingsContainer
              genesisMarketsDiscountPercent={
                wallet.genesisMarketsDiscountPercent
              }
            />
          </RowItem>
        </Row>
        <WalletBalanceElements
          available={wallet.grandTotal.available}
          pending={wallet.grandTotal.trading}
          total={wallet.grandTotal.total}
          invested={wallet.grandTotal.invested}
          currency={wallet.grandTotal.currency}
        />
      </TitleBlock>
      <WalletTablesTotal wallets={wallet.wallets} />
    </Page>
  );
};

const WalletTotal = withBlurLoader(React.memo(_WalletTotal));
export default WalletTotal;
