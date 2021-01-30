import { getActiveUrl } from "components/active/active.helpers";
import ActivePopup from "components/active/active.popup";
import WalletImage from "components/avatar/wallet-image/wallet-image";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { $textLightColor } from "utils/style/colors";
import { fontSize, height, width } from "utils/style/mixins";
import { $boxShadow1 } from "utils/style/shadow";
import {
  $dividerTitle,
  $fontSizeParagraph,
  $fontSizeSmall,
  $walletItemSize
} from "utils/style/sizes";
import { CurrencyEnum } from "utils/types";

export interface ICurrencyItemProps {
  showTitle?: boolean;
  url?: string;
  symbol?: string | CurrencyEnum;
  big?: boolean;
  rate?: number;
  clickable?: boolean;
  small?: boolean;
  logo?: string;
  name?: string | CurrencyEnum;
}

const Icon = styled(RowItem) <{ small?: boolean }>`
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

const nameStyle = css`
  white-space: nowrap;
  letter-spacing: 0.6px;
  color: ${$textLightColor};
`;

const Name = styled.div`
  ${nameStyle};
  ${fontSize($fontSizeParagraph)};
`;

const BigName = styled.h1`
  ${nameStyle};
  padding: 0;
`;

const Rate = styled.div`
  ${fontSize($fontSizeSmall)};
  color: ${$textLightColor};
`;

const _CurrencyItem: React.FC<ICurrencyItemProps> = ({
  url,
  symbol,
  big,
  rate,
  logo,
  name,
  small,
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
            {big ? <BigName>{name}</BigName> : <Name>{name}</Name>}
            {rate && <Rate>{rateString}</Rate>}
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
