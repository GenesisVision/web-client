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
          excludedCountries: [ "USA" ],
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
                 "name": "phone",
                 "required": true
              },
              {
                name: "country",
                required: true
              }
            ]
          },
          requiredDocuments: "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE",
          uiConf: {
            customCssUrl: "https://genesis.vision/assets/kyc/style.css",
            steps: {
              SELFIE: {
                instructions:
                  '## Please take a selfie of you holding a paper with the current date and "GV" written on it.'
              }
            }
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
