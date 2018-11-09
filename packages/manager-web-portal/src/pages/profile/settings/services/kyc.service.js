import { profileApiProxy } from "services/api-client/profile-api";

import authService from "../../../../services/auth-service";

export const loadKycIFrame = () => {
  const authorization = authService.getAuthArg();

  profileApiProxy
    .v10ProfileVerificationTokenPost(authorization)
    .then(({ data }) => {
      window.idensic.init(
        // selector of an IFrame container (see above)
        "#idensic",
        // configuration object (see preparation steps)
        {
          accessToken: data,
          lang: "en",
          applicantDataPage: {
            enabled: true,
            fields: [
              {
                name: "firstName",
                required: true
              },
              {
                name: "lastName",
                required: true
              },
              {
                name: "email",
                required: true
              },
              {
                name: "phone",
                required: true
              },
              {
                name: "country",
                required: true
              }
            ]
          },
          requiredDocuments: "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE",
          uiConf: {
            customCssUrl: "https://genesis.vision/assets/kyc/style.css"
          }
        },
        // function for the IFrame callbacks
        function(messageType, payload) {
          // just logging the incoming messages
          console.log("[IDENSIC DEMO] Idensic message:", messageType, payload);
        }
      );
    });
};
