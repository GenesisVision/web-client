import ImageBaseElement from "components/avatar/image-base.element";
import { DialogTop } from "components/dialog/dialog-top";
import PaperPlan from "media/paper-plane.svg";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  min-height: 300px;
`;

const Image = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
`;

const WalletWithdrawRequest: React.FC = () => {
  const [t] = useTranslation();
  return (
    <DialogTop>
      <Container>
        <Image>
          <ImageBaseElement src={PaperPlan} alt="Confirm withdrawal" />
        </Image>
        <p>{t("wallet-withdraw:withdraw-request")}</p>
      </Container>
    </DialogTop>
  );
};

export default React.memo(WalletWithdrawRequest);
