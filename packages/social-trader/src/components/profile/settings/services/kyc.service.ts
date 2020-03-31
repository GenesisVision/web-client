import profileApi from "services/api-client/profile-api";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const loadKycIFrame = () => {
  const $script = require("scriptjs");
  $script(process.env.REACT_APP_IDENSIC_SRC, function() {
    if (!(window as any).idensic.init) return;
    api
      .profile()
      .getVerificationToken()
      .then(data => {
        (window as any).idensic.init(
          // selector of an IFrame container (see above)
          "#idensic",
          // configuration object (see preparation steps)
          {
            accessToken: data,
            excludedCountries: ["USA"],
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
            requiredDocuments:
              "IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE",
            uiConf: {
              customCssUrl: "https://genesis.vision/assets/kyc/style.css?v=1",
              steps: {}
            }
          },
          // function for the IFrame callbacks
          function(messageType: any, payload: any) {
            // just logging the incoming messages
            console.log(
              "[IDENSIC DEMO] Idensic message:",
              messageType,
              payload
            );
          }
        );
      });
  });
};
