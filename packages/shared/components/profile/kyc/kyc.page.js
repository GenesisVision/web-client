import React from "react";

import ProfileLayout from "../profile-layout";
import KYCContainer from "./kyc.container";

const KYCPage = () => {
  return (
    <ProfileLayout route="verify">
      <KYCContainer />
    </ProfileLayout>
  );
};

export default KYCPage;
