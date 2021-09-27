import { getActiveUrl } from "components/active/active.helpers";
import ActivePopup from "components/active/active.popup";
import WalletImage from "components/avatar/wallet-image/wallet-image";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { Themes } from "components/trading-view/trading-view";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { $rowColor, $textLightColor } from "utils/style/colors";
import { fontSize, height, width } from "utils/style/mixins";
import { $boxShadow1 } from "utils/style/shadow";
import {
  $dividerTitle,
  $fontSizeParagraph,
  $fontSizeSmall,
  $walletItemSize
} from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

type ThemePropsType = { theme?: Themes };

export interface ICurrencyItemProps extends ThemePropsType {
  showTitle?: boolean;
  url?: string;
  symbol?: string | CurrencyEnum;
  big?: boolean;
  rate?: number;
  clickable?: boolean;
  small?: boolean;
  logo?: string;
  name?: string | CurrencyEnum;
  amount?: number;
}

const Icon = styled(RowItem)<{ small?: boolean }>`
  object-fit: cover;
  box-shadow: ${$boxShadow1};
  border-radius: 100%;
  & img {
    width: 100%;
    border-radius: 100%;
    height: auto;
  }
  ${({ small }) =>
    small
      ? `
    ${width($walletItemSize / $dividerTitle)};
    ${height($walletItemSize / $dividerTitle)};
  `
      : `
    ${width($walletItemSize)};
    ${height($walletItemSize)};
  `}
`;

const themeStyle = css<ThemePropsType>`
  color: ${({ theme }) => {
    switch (theme) {
      case Themes.DARK:
        return $textLightColor;
      case Themes.LIGHT:
        return $rowColor;
    }
  }};
`;

const nameStyle = css<ThemePropsType>`
  white-space: nowrap;
  letter-spacing: 0.6px;
  ${themeStyle};
`;

const Name = styled.div`
  ${nameStyle};
  ${fontSize($fontSizeParagraph)};
`;

const BigName = styled.h1`
  ${nameStyle};
  padding: 0;
`;

const Rate = styled.div<ThemePropsType>`
  ${fontSize($fontSizeSmall)};
  ${themeStyle};
`;

const Amount = styled.span<ThemePropsType>`
  ${themeStyle};
  opacity: 0.6;
`;

const _CurrencyItem: React.FC<ICurrencyItemProps> = ({
  url,
  symbol,
  big,
  rate,
  logo,
  name,
  small,
  amount,
  theme = Themes.DARK,
  clickable = true,
  showTitle = true
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const openPopup = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      setOpenPopup();
    },
    []
  );
  const rateString = `1 ${name} = ${rate} $`;
  const renderItemContent = () => (
    <div data-test-id={symbol}>
      <Row>
        {logo && (
          <Icon small={small} size={small ? "small" : undefined}>
            <WalletImage url={logo} alt={name || symbol} />
          </Icon>
        )}
        {name && (
          <RowItem>
            {big ? (
              <BigName theme={theme}>
                {name}
                {amount && <Amount> {amount}</Amount>}
              </BigName>
            ) : (
              <Name theme={theme}>
                {name}
                {amount && <Amount> {amount}</Amount>}
              </Name>
            )}
            {rate && <Rate theme={theme}>{rateString}</Rate>}
          </RowItem>
        )}
      </Row>
    </div>
  );
  const active = symbol || name || "";
  return (
    (clickable && (
      <>
        <a
          title={showTitle ? active : ""}
          href={getActiveUrl(url || active)}
          onClick={openPopup}
        >
          {renderItemContent()}
        </a>
        <ActivePopup
          open={isOpenPopup}
          onClose={setClosePopup}
          active={active}
        />
      </>
    )) ||
    renderItemContent()
  );
};

export const CurrencyItem = React.memo(_CurrencyItem);
