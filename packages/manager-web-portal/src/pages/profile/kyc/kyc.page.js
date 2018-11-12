import ProfileLayout from "pages/profile/profile-layout";
import React from "react";

import KYCContainer from "./kyc.container";

const KYCPage = ({ t }) => {
  return (
    <ProfileLayout route="verify">
      <KYCContainer />
    </ProfileLayout>
  );
};

export default KYCPage;
