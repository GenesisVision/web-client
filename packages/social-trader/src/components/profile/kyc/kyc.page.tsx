import React from "react";

import ProfileLayout from "../profile-layout";
import { VERIFY } from "../profile.constants";
import KYCContainer from "./kyc.container";

const KYCPage = React.memo(() => (
  <ProfileLayout route={VERIFY}>
    <KYCContainer />
  </ProfileLayout>
));

export default KYCPage;
