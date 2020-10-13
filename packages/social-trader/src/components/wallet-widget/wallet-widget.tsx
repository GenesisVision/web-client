import HeaderIcon from "components/header/header-icon";
import { WalletIcon } from "components/icon/wallet-icon";
import Popover from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { withBlurLoader } from "decorators/with-blur-loader";
import { WalletsGrandTotal } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import WalletDeposit, {
  WALLET_DEPOSIT_BUTTON_TYPE
} from "modules/wallet-deposit/wallet-deposit";
import dynamic from "next/dist/next-server/lib/dynamic";
import * as React from "react";
import styled from "styled-components";
import { formatCurrencyValue } from "utils/formatter";
import { $primaryColor } from "utils/style/colors";
import { $fontSizeCommon } from "utils/style/sizes";

const WalletWidgetPopoverContent = dynamic(() =>
  import("components/wallet-widget/wallet-widget-popover-content")
);

const WalletContainer = styled(Row)`
  font-size: ${$fontSizeCommon}px;
  cursor: pointer;

  &:hover {
    svg [stroke] {
      stroke: ${$primaryColor};
    }
  }
`;

const IconContainer = styled.div`
  height: 20px;
  width: 20px;
`;

const Amount = styled.div`
  white-space: nowrap;
`;

const _WalletWidget: React.FC<Props> = ({
  data: { currency, available, invested, trading, total }
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <Row>
        <RowItem>
          <WalletContainer onClick={setAnchor}>
            <HeaderIcon>
              <IconContainer>
                <WalletIcon primary={anchor !== undefined} />
              </IconContainer>
            </HeaderIcon>
            <Amount>{`${formatCurrencyValue(
              available,
              currency
            )} ${currency}`}</Amount>
          </WalletContainer>
        </RowItem>
        <RowItem>
          <HeaderIcon>
            <WalletDeposit type={WALLET_DEPOSIT_BUTTON_TYPE.SMALL} />
          </HeaderIcon>
        </RowItem>
      </Row>
      <Popover anchorEl={anchor} onClose={clearAnchor}>
        <WalletWidgetPopoverContent
          currency={currency}
          available={available}
          total={total}
          clearAnchor={clearAnchor}
          invested={invested}
          trading={trading}
        />
      </Popover>
    </>
  );
};

interface Props {
  data: WalletsGrandTotal;
}

const WalletWidget = withBlurLoader(React.memo(_WalletWidget));
export default WalletWidget;
