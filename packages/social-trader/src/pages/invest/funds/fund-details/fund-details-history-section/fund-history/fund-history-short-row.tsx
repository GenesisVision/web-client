import ImageBase from "components/avatar/image-base";
import { Center } from "components/center/center";
import ShortArrow from "components/icon/short-arrow/short-arrow";
import { RowItem } from "components/row-item/row-item";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import SocialLink from "media/social-link.svg";
import { FundHistoryDescription } from "pages/invest/funds/fund-details/fund-details-history-section/fund-history/fund-history-description";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import React from "react";
import styled from "styled-components";
import { formatDate } from "utils/dates";
import { height, width } from "utils/style/mixins";

interface Props {
  isOpen: boolean;
  setOpen: VoidFunction;
  item: IFundHistoryDataItem;
}

const StyledRow = styled(TableRow)<{ clickable?: boolean }>`
  & td {
    cursor: pointer;
  }
`;

const LogoContainer = styled(RowItem)<{ clickable?: boolean }>`
  ${height(28)};
  ${width(28)};
  & img {
    width: 100%;
    height: 100%;
  }
`;

const ExpandIcon = styled(RowItem)<{ clickable?: boolean }>`
  width: 10px;
  height: 10px;
`;

const _FundHistoryShortRow: React.FC<Props> = ({ isOpen, setOpen, item }) => {
  const hasTrades = !!item.trades.length;
  return (
    <StyledRow onClick={setOpen} clickable={hasTrades}>
      <TableCell>{formatDate(item.date)}</TableCell>
      <TableCell>
        <Center>
          <LogoContainer size={"small"}>
            <ImageBase
              src={item.logoUrl}
              alt={item.type}
              defaultImage={SocialLink}
            />
          </LogoContainer>
          <RowItem> {item.type}</RowItem>
        </Center>
      </TableCell>
      <TableCell>
        <Center>
          <RowItem wide>
            <FundHistoryDescription
              description={item.description}
              assets={item.newAssets}
              type={item.type}
            />
          </RowItem>
          {hasTrades && (
            <ExpandIcon>
              <ShortArrow direction={isOpen ? "top" : "bottom"} />
            </ExpandIcon>
          )}
        </Center>
      </TableCell>
    </StyledRow>
  );
};

const FundHistoryShortRow = React.memo(_FundHistoryShortRow);
export default FundHistoryShortRow;
