import ImageBaseElement from "components/avatar/image-base.element";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Error from "media/transactions/error.svg";
import Pending from "media/transactions/pending.svg";
import Success from "media/transactions/success.svg";
import * as React from "react";
import styled from "styled-components";
import { height, width } from "utils/style/mixins";

const statuses = {
  Done: Success,
  Error: Error,
  Canceled: Error,
  Pending: Pending
};

export type IStatus = {
  withText?: boolean;
  status: "Done" | "Pending" | "Canceled" | "Error";
};

const StyledImage = styled(ImageBaseElement)`
  ${width(24)}
  ${height(24)}
`;

const _Status: React.FC<IStatus> = ({ withText, status }) => {
  return (
    <Row>
      <RowItem size={"small"}>
        <Row>
          <StyledImage src={statuses[status]} alt={`status ${status}`} />
        </Row>
      </RowItem>
      {withText && <RowItem>{status}</RowItem>}
    </Row>
  );
};

const Status = React.memo(_Status);
export default Status;
